import express from "express";
import multer from "multer";
import moment from "moment-timezone";
import fs from "fs";
import path from "path";

import { fileURLToPath } from 'url';
import { dirname } from 'path';

import { getQueryStr } from '../back-lib/lib.js';
import { sql_con } from '../back-lib/db.js'

import aligoapi from 'aligoapi'

const apiRouter = express.Router();

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

let img_upload_set = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            const folder = req.body.folder || 'default';
            const uploadPath = path.join(__dirname, '..', 'public', 'uploads', 'image', folder);
            ensureDirectoryExistence(uploadPath);
            cb(null, uploadPath);
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        }
    })
})

// 폴더 존재 여부 확인 및 생성
const ensureDirectoryExistence = (folderPath) => {
    if (!fs.existsSync(folderPath)) {
        fs.mkdirSync(folderPath, { recursive: true });
    }
};

const storage = multer.diskStorage({
    destination: "temp/", // 임시 저장 경로
    filename(req, file, cb) {
        cb(null, file.originalname); // 원본 파일명을 사용
    },
});

const img_upload = multer({ storage });

apiRouter.get('/', (req, res) => {
    res.cookie("test", 'sdljflisdjflisjdfiljsdf', { httpOnly: true, secure: true })
    res.send('asldfjalisjdfliajsdf')
})

apiRouter.post('/inquiryUpdate', async (req, res) => {
    const body = req.body;

    try {
        const queryStr = getQueryStr(body, 'insert', 'af_created_at');
        const insertCopyData = `INSERT INTO application_form (${queryStr.str}) VALUES (${queryStr.question})`;
        await sql_con.promise().query(insertCopyData, queryStr.values);


        // 알리고 카톡 발송!!!

        const AuthData = {
            apikey: process.env.ALIGOKEY,
            // 이곳에 발급받으신 api key를 입력하세요
            userid: process.env.ALIGOID,
            // 이곳에 userid를 입력하세요
        }
        
        req.body = {
            type: 'i',  // 유효시간 타입 코드 // y(년), m(월), d(일), h(시), i(분), s(초)
            time: 1, // 유효시간
        }
        const result = await aligoapi.token(req, AuthData);

        req.body = {
            senderkey: process.env.ALIGO_SENDERKEY,
            token: result.token,
            tpl_code: 'TX_0641',
            sender: '010-6628-6651',
            receiver_1: '010-7549-7263',
            subject_1: '분양정보 신청고객 알림톡',
            message_1: `고객 접수 안내!\n${body.af_form_name} ${body.af_mb_name} 접수되었습니다.\n고객 번호 : ${body.af_mb_phone}`,
        }
    } catch (error) {
        console.error(error.message);
    }

    res.json({ result: 'success' })
})

apiRouter.post('/img_upload_set', img_upload_set.single('onimg'), (req, res, next) => {
    let saveUrl = ""

    saveUrl = `/img/${req.body.folder}/${req.file.originalname}`

    res.json({ saveUrl })
})


apiRouter.post('/delete_sort_img', async (req, res, next) => {

    const body = req.body;
    const delPath = `public/uploads/image/${body.getFolder}/${body.getImgName}`

    try {
        await fs.unlink(delPath, (err) => {
            console.error(err);

        })
    } catch (error) {
        status = false
        console.error(error);
    }
    res.json({})
})
apiRouter.post('/upload_sort_img', img_upload.single('onimg'), (req, res, next) => {

    let baseUrl
    const body = req.body;

    const { folderName } = req.body; // POST로 전달된 폴더명
    if (!folderName) {
        return res.status(400).send("Folder name is required");
    }

    try {
        const uploadPath = imgFolderChk(folderName)
        // 파일 이동
        const tempPath = req.file.path; // 임시 저장된 경로

        const targetPath = path.join(uploadPath, req.file.originalname); // 최종 저장 경로
        fs.renameSync(tempPath, targetPath); // 파일 이동

        const origin = req.get('host');
        // baseUrl = req.protocol + '://' + origin + '/img/' + folderName + '/' + req.file.filename;
        baseUrl = '/img/' + folderName + '/' + req.file.filename;

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err });
    }

    // let status = true;






    res.json({ baseUrl })
})

function imgFolderChk(folderName) {
    let setFolder
    const now = moment().format('YYMMDD')

    try {
        fs.readdirSync(`public`);
    } catch (error) {
        fs.mkdirSync(`public`);
    }


    try {
        fs.readdirSync(`public/uploads`);
    } catch (error) {
        fs.mkdirSync(`public/uploads`);
    }

    try {
        fs.readdirSync(`public/uploads/image`);
    } catch (error) {
        fs.mkdirSync(`public/uploads/image`);
    }

    try {
        fs.readdirSync(`public/uploads/image/${folderName}`);
    } catch (error) {
        fs.mkdirSync(`public/uploads/image/${folderName}`);
    }
    setFolder = `public/uploads/image/${folderName}`


    return setFolder;
}

export { apiRouter }