import express from "express";
import { sql_con } from '../back-lib/db.js'
import { getQueryStr, deleteFolder } from '../back-lib/lib.js';
import moment from "moment-timezone";
import fs from "fs-extra";

import { Storage } from "@google-cloud/storage";


import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const minisiteRouter = express.Router();


const storage = new Storage({
    projectId: process.env.GCS_PROJECT_ID,
    keyFilename: process.env.GCS_KEY_FILE,
});

// 폴더 복사 함수
async function copyFolder(bucketName, oldFolder, newFolder) {
    const bucket = storage.bucket(bucketName);
    const [files] = await bucket.getFiles({ prefix: oldFolder + '/' });

    for (const file of files) {
        const newFileName = file.name.replace(`${oldFolder}/`, `${newFolder}/`);
        const destFile = bucket.file(newFileName);

        await file.copy(destFile);
        await destFile.makePublic(); // 🔥 이 줄이 포인트

        console.log(`Copied & public: ${file.name} → ${newFileName}`);
    }
}

// GCS 폴더 삭제 함수
async function deleteGcsFolderIfExists(bucketName, folderPath) {
    const bucket = storage.bucket(bucketName);

    // 1️⃣ 폴더 존재 여부 확인 (파일 1개만 체크)
    const [files] = await bucket.getFiles({
        prefix: folderPath,
        maxResults: 1,
    });

    // 2️⃣ 폴더가 없으면 종료
    if (files.length === 0) {
        console.log(`폴더 없음 → 삭제 스킵: ${folderPath}`);
        return;
    }

    // 3️⃣ 폴더가 있을 경우 전체 파일 조회
    const [allFiles] = await bucket.getFiles({
        prefix: folderPath,
    });

    // 4️⃣ 파일 전체 삭제
    await Promise.all(
        allFiles.map(file => file.delete())
    );

    console.log(`폴더 삭제 완료: ${folderPath}`);
}

// 여기 0409 추가한 부분!!!! 사이트 타입 조절!!!
minisiteRouter.post('/update_site_type', async (req, res) => {
    const body = req.body;
    try {
        const updateTypeQuery = "UPDATE land SET ld_view_type = ? WHERE ld_id = ?";
        await sql_con.promise().query(updateTypeQuery, [body.ld_view_type, body.ld_id]);
    } catch (error) {

    }
    res.json({})

})
// 끝!!!

minisiteRouter.post('/add_sub_domain', async (req, res) => {
    const body = req.body;

    const now = moment().format('YYYY-MM-DD HH:mm:ss');

    try {
        const addSubDomainQuery = "INSERT INTO land (ld_domain, ld_created_at) VALUES (?,?)";
        await sql_con.promise().query(addSubDomainQuery, [body.addSubDomainVal, now]);
    } catch (error) {

    }
    res.json({})

})

minisiteRouter.post('/add_hy_site', async (req, res) => {
    const hy_num = req.body.hy_num;
    const hy_site_name = req.body.hy_site_name;
    const now = moment().format('YYYY-MM-DD HH:mm:ss');
    let err_message = "";
    try {
        const addHySiteQuery = `INSERT INTO hy_site (hy_num, hy_title, hy_creted_at) VALUES (?,?,?)`;
        await sql_con.promise().query(addHySiteQuery, [hy_num, hy_site_name, now]);
    } catch (err) {
        err_message = err.message;
        console.error(err_message);

    }

    res.json({ err_message })
})


minisiteRouter.post('/apply_site', async (req, res) => {
    const ldId = req.body.ld_id
    const setSite = req.body.setSite
    try {
        const updateLandSiteQuery = "UPDATE land SET ld_site = ? WHERE ld_id = ?";
        await sql_con.promise().query(updateLandSiteQuery, [setSite, ldId]);
    } catch (err) {
        console.error(err.message);
    }
    res.json({})
})
minisiteRouter.post('/load_site_list', async (req, res) => {
    const filterKeyword = req.body.filter_keyword;
    let addQuery = ""
    let site_list = [];
    if (filterKeyword) {
        addQuery = `WHERE sl_site_name LIKE '%${filterKeyword}%'`
    }

    try {
        const getSiteListQuery = `SELECT * FROM site_list ${addQuery}`;

        const [siteListRows] = await sql_con.promise().query(getSiteListQuery);
        site_list = siteListRows;
    } catch (error) {

    }
    res.json({ site_list });
})



minisiteRouter.get('/', (req, res) => {
    res.send('asldfjalisjdfliajsdf')
})


// 아래는 미니 사이트1 !!!!!!!!!!!!

minisiteRouter.post('/copy_hy_data', async (req, res) => {
    const body = req.body;

    console.log('일단 들어옴?!?!');


    try {
        const getHyDataQuery = "SELECT * FROM hy_site WHERE hy_id = ?";
        const [getHyDataRow] = await sql_con.promise().query(getHyDataQuery, body.copyData.hy_id);
        const getHyData = getHyDataRow[0];

        delete getHyData.hy_id;

        let keyStr = "";
        let questions = "";
        let values = [];

        console.log(getHyData);

        for (const key in getHyData) {
            keyStr += `${key},`;
            questions += `?,`;

            if (key == 'hy_creted_at') {
                const getTime = moment(getHyData[key]).format('YYYY-MM-DD HH:mm:ss');
                values.push(getTime)
            } else if (key == 'hy_num') {
                values.push(body.copyId)
            } else if (key.includes('image')) {
                try {
                    const getImgPath = getHyData[key].replaceAll(body.copyData.hy_num, body.copyId)
                    values.push(getImgPath);
                } catch (error) {
                    values.push(null);
                }
            } else {
                values.push(getHyData[key])
            }

        }

        if (keyStr.endsWith(',')) {
            keyStr = keyStr.slice(0, -1);
        }

        if (questions.endsWith(',')) {
            questions = questions.slice(0, -1);
        }

        const getOldFolder = `./public/uploads/image/${body.copyData.hy_num}`
        const getNewFolder = `./public/uploads/image/${body.copyId}`;
        if (fs.existsSync(getOldFolder)) {
            fs.copySync(getOldFolder, getNewFolder);
        } else {
        }

        copyFolder(process.env.GCS_BUCKET_NAME, `mini1/${body.copyData.hy_num}`, `mini1/${body.copyId}`);

        const addHyDataQuery = `INSERT INTO hy_site (${keyStr}) VALUES (${questions})`;

        console.log(addHyDataQuery);
        console.log(values);
        console.log(values.length);



        await sql_con.promise().query(addHyDataQuery, values);
    } catch (err) {
        console.error(err.message);
    }

    res.json({})
})


minisiteRouter.post('/delete_hy_raw', async (req, res) => {
    const deleteData = req.body.deleteData;
    for (let i = 0; i < deleteData.length; i++) {
        const data = deleteData[i];
        const deletePath = `./public/uploads/image/${data.hy_num}`
        deleteFolder(deletePath)

        deleteGcsFolderIfExists(process.env.GCS_BUCKET_NAME, `mini1/${data.hy_num}/`)
        try {
            const deleteHyRawQuery = "DELETE FROM hy_site WHERE hy_id = ?";
            await sql_con.promise().query(deleteHyRawQuery, data.hy_id);
        } catch (error) {
        }
    }
    res.json({})
})
minisiteRouter.post('/update_hy_raw', async (req, res) => {
    const updateData = req.body.updateData;
    let duplication_num = 0;
    for (let i = 0; i < updateData.length; i++) {
        const data = updateData[i];
        const hyId = data.hy_id;
        delete data.hy_id;
        const queryStr = getQueryStr(data, 'update');
        queryStr.values.push(hyId);

        try {
            const updateHyRawQuery = `UPDATE hy_site SET ${queryStr.str} WHERE hy_id = ?`;
            await sql_con.promise().query(updateHyRawQuery, queryStr.values);
        } catch (error) {
            console.error(error.message);

            duplication_num++
        }
    }

    res.json({ duplication_num })
})


minisiteRouter.post('/update_hy_data', async (req, res) => {
    const hySiteData = req.body


    const hyId = hySiteData.hy_id;
    delete hySiteData.hy_id;
    hySiteData.hy_creted_at = moment(hySiteData.hy_creted_at).format('YYYY-MM-DD HH:mm:ss');
    const queryStr = getQueryStr(hySiteData, 'update');
    queryStr.values.push(hyId)

    try {
        const hySiteUpdateQuery = `UPDATE hy_site SET ${queryStr.str} WHERE hy_id = ?`;
        await sql_con.promise().query(hySiteUpdateQuery, queryStr.values);
    } catch (err) {
        console.error(err.message);
    }
    res.json({})
})

minisiteRouter.post('/load_hy_data', async (req, res) => {
    const hyId = req.body.getHyId;
    let hyData = {}
    try {
        const getHyDattaQuery = "SELECT * FROM hy_site WHERE hy_id = ? ";

        const [hyDataRows] = await sql_con.promise().query(getHyDattaQuery, [hyId.id]);
        hyData = hyDataRows[0]
    } catch (err) {
        console.error(err.message);
    }

    res.json({ hyData })
})

minisiteRouter.post('/load_minisite', async (req, res) => {

    let minisiteData = [];
    let allCount = 0;
    let allPage = 0;
    let onePageCount = 10;
    const nowPage = req.body.nowPage || 1;
    const search = req.body.search || "";
    let searchStr = "";


    let site_list = [];
    if (search) {
        searchStr = `WHERE hy_title LIKE '%${search}%'`;
    }

    try {
        const getMinisite1CountQuery = `SELECT count(*) AS m1Count FROM hy_site ${searchStr}`;

        const [countRows] = await sql_con.promise().query(getMinisite1CountQuery);
        allCount = countRows[0].m1Count;
        allPage = Math.ceil(allCount / onePageCount);
        const startCount = (nowPage - 1) * onePageCount;


        const getMinisite1Query = `SELECT hy_id,hy_num,hy_title,hy_manage_site,hy_counter FROM hy_site ${searchStr} ORDER BY hy_id DESC LIMIT ${startCount}, ${onePageCount}`;
        const [miniSiteRows] = await sql_con.promise().query(getMinisite1Query);
        minisiteData = miniSiteRows;

        const getSiteListQuery = "SELECT sl_id, sl_site_name FROM site_list ORDER BY sl_id DESC";
        [site_list] = await sql_con.promise().query(getSiteListQuery);
    } catch (err) {
        console.error(err.message);
    }

    res.json({ minisiteData, allPage, site_list })
})


minisiteRouter.post('/load_land_minisite', async (req, res) => {

    const body = req.body;

    let land_minisite_data = [];
    let allCount = 0;
    let allPage = 0;
    let onePageCount = 15;
    const nowPage = body.nowPage

    try {
        const getLandMinisiteCountQuery = "SELECT count(*) AS m1Count FROM land";
        const [countRows] = await sql_con.promise().query(getLandMinisiteCountQuery);
        allCount = countRows[0].m1Count;
        allPage = Math.ceil(allCount / onePageCount);
        const startCount = (nowPage - 1) * onePageCount;

        const getLandMinisiteQuery = `SELECT * FROM land ORDER BY ld_id DESC LIMIT ${startCount}, ${onePageCount}`;
        const [landMiniSiteRows] = await sql_con.promise().query(getLandMinisiteQuery);
        land_minisite_data = landMiniSiteRows;

        for (let i = 0; i < land_minisite_data.length; i++) {
            const data = land_minisite_data[i];
            // const getDbCountQuery = `SELECT count(*) AS dbcount FROM application_form WHERE af_form_name = ? AND af_form_type_in = ?`
            // const [getDbCount] = await sql_con.promise().query(getDbCountQuery, [data.ld_site, 'subdomain']);

            const getDbCountQuery = `SELECT count(*) AS dbcount FROM application_form WHERE af_form_name = ?`
            const [getDbCount] = await sql_con.promise().query(getDbCountQuery, [data.ld_site]);
            land_minisite_data[i]['db_count'] = getDbCount[0]['dbcount']
        }

    } catch (err) {
        console.error(err.message);
    }

    res.json({ land_minisite_data, allCount, allPage })
})

minisiteRouter.get('/', (req, res) => {
    res.send('asldfjalisjdfliajsdf')
})



// 사이트 리스트 불러오기! (hy_site / hy_site_one 페이지 두개 동일하게 쓰는중!)
minisiteRouter.post('/get_site_list', async (req, res) => {
    let site_list = [];
    const searchSite = req.body.search_site
    let addQuery = ""
    if (searchSite) {
        addQuery = `WHERE sl_site_name LIKE '%${searchSite}%'`
    }
    try {
        const getSiteListQuery = `SELECT sl_id,sl_site_name FROM site_list ${addQuery} ORDER BY sl_id DESC`;
        [site_list] = await sql_con.promise().query(getSiteListQuery);

    } catch (error) {

    }

    res.json({ site_list })
})


export { minisiteRouter }