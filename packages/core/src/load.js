import axios from "axios";
import { getPagination } from "$core/lib.js";
import { back_api } from "$core/const"
import moment from "moment-timezone";
import { user_info } from "$core/store";

export async function userManage(url) {
    const nowPage = url.searchParams.get('page') || 1;

    let userRate = url.searchParams.get('user_rate') || "";
    let searchName = url.searchParams.get('search_name') || "";
    let searchEmail = url.searchParams.get('search_email') || "";

    let pageArr = []
    let user_datas = [];
    let manager_datas = [];
    let allPage = 0;
    try {
        const res = await axios.post(`${back_api}/usermanage/load_users`, { nowPage, userRate, searchName, searchEmail })
        if (res.status == 200) {
            user_datas = res.data.user_datas
            manager_datas = res.data.manager_datas
            pageArr = getPagination(parseInt(nowPage), res.data.allPage);
            allPage = res.data.allPage;
        }
    } catch (error) {

    }
    return { user_datas, manager_datas, pageArr, allPage }
}


export async function miniSiteView(params) {
    let user_status = false;

    user_info.subscribe(e => {
        if (e.id) {
            user_status = true;
        }
    })

    let minisiteData = {}
    try {
        const res = await axios.post(`${back_api}/main/load_minisite_info`, { hy_id: params.id, user_status })
        if (res.status == 200) {
            minisiteData = res.data.minisite_data
        }
    } catch (error) {

    }

    return { minisiteData }
}

export async function miniWindow(params) {
    let hyData = {}
    const getHyId = params;

    try {
        const res = await axios.post(`${back_api}/minisite/load_hy_data`, {
            getHyId,
        });
        if (res.status == 200) {
            hyData = res.data.hyData;
        }
    } catch (error) {
        alert("에러 발생 다시 시도 해주세요.");
    }

    console.log(hyData);
    return { hyData }
}

export async function managerDb(url) {

    let manager_id = ""

    user_info.subscribe((e) => {
        if (e.rate == '5') {
            manager_id = 'masters'
        } else {
            manager_id = e.id
        }
    })

    const start_date = url.searchParams.get('sd') || moment().startOf("month").format('YYYY-MM-DD')
    const end_date = url.searchParams.get('ed') || moment().format('YYYY-MM-DD')
    const nowPage = url.searchParams.get('page') || 1;
    const one_page_count = url.searchParams.get('pagecount') || 30;
    const filterSite = url.searchParams.get('filtersite') || "";
    const setSite = url.searchParams.get('setsite') || "";
    const setStatus = url.searchParams.get('setstatus') || "";

    // const search = url.searchParams.get('search');

    let data = {
        datas: [],
        pageArr: [],
        reverseIdxArr: [],
        site_list: [],
        statusArr: [],
        allPage: 0
    }

    let allCount = 0;
    let colorArr = [];

    try {
        const res = await axios.post(`${back_api}/managerdb/load_data`, { start_date, end_date, nowPage, one_page_count, filterSite, setSite, setStatus, manager_id })
        if (res.status == 200) {

            allCount = res.data.allCount;
            colorArr = res.data.status_color_list;

            data.allPage = Number(res.data.allPage);
            data.datas = res.data.datas;
            data.pageArr = getPagination(parseInt(nowPage), data.allPage);
            const reverseStartCount = allCount - ((nowPage - 1) * one_page_count)
            data.reverseIdxArr = Array.from({ length: one_page_count }, (_, i) => reverseStartCount - i);
            data.site_list = res.data.site_list;
            data.statusArr = res.data.status_list;

            // 객체에 색깔 지정해서 넣기
            for (let i = 0; i < data.datas.length; i++) {
                if (data.datas[i]['af_mb_status']) {
                    data.datas[i]['bg_color'] = getColorByStatus(data.datas[i]['af_mb_status'], data.statusArr, colorArr)
                }
            }
        }
    } catch (error) {
        console.error(error.message);

    }




    return data
}

export async function dbUpload(url) {
    const data = {
        siteList: []
    }
    try {
        const res = await axios.post(`${back_api}/adminbase/dbupload_site_list`)
        if (res.status == 200) {
            data.siteList = res.data.site_list;
        }
    } catch (error) {

    }
    return data
}



export async function dbCountLoad(url) {

    // site_count_info_list, dateArr, pageList, loading, allPageCount

    const data = {
        site_count_info_list: [],
        dateArr: [],
        pageList: [],
        allPageCount: 0
    }

    let now_page = url.searchParams.get('page')
    let startDate = url.searchParams.get('sd');
    let endDate = url.searchParams.get('ed');
    let search = url.searchParams.get('search');


    try {
        const res = await axios.post(`${back_api}/dbcount`, { now_page, startDate, endDate, search })
        if (res.status === 200) {
            data.site_count_info_list = res.data.site_count_info_list;
            data.dateArr = res.data.dateArray;
            data.pageList = res.data.page_list;
            data.allPageCount = res.data.allPageCount

            return data
        }
    } catch (error) {

    }
}


export async function allDbLoad(url) {
    const start_date = url.searchParams.get('sd') || moment().startOf("month").format('YYYY-MM-DD')
    const end_date = url.searchParams.get('ed') || moment().format('YYYY-MM-DD')
    const nowPage = url.searchParams.get('page') || 1;
    const one_page_count = url.searchParams.get('pagecount') || 30;
    const filterSite = url.searchParams.get('filtersite') || "";
    const setSite = url.searchParams.get('setsite') || "";
    const setStatus = url.searchParams.get('setstatus') || "";

    const data = {
        datas: [],
        pageArr: [],
        reverseIdxArr: [],
        site_list: [],
        statusArr: 0,
        allPage: 0
    }

    let allCount = 0;
    let colorArr = [];

    try {
        const res = await axios.post(`${back_api}/alldb/load_data`, { start_date, end_date, nowPage, one_page_count, filterSite, setSite, setStatus })
        if (res.status == 200) {

            allCount = res.data.allCount;
            colorArr = res.data.status_color_list;

            data.datas = res.data.datas;

            const reverseStartCount = allCount - ((nowPage - 1) * one_page_count)
            data.reverseIdxArr = Array.from({ length: one_page_count }, (_, i) => reverseStartCount - i);
            data.site_list = res.data.site_list;
            data.statusArr = res.data.status_list;
            data.allPage = res.data.allPage;

            data.pageArr = getPagination(parseInt(nowPage), data.allPage);

            // 객체에 색깔 지정해서 넣기
            for (let i = 0; i < data.datas.length; i++) {
                if (data.datas[i]['af_mb_status']) {
                    data.datas[i]['bg_color'] = getColorByStatus(data.datas[i]['af_mb_status'], data.statusArr, colorArr)
                }
            }
        }


    } catch (error) {

    }



    return data
}

export async function minisite1Load(url) {
    const nowPage = url.searchParams.get('page') || 1;
    const search = url.searchParams.get('search');

    let data = {
        pageArr: [],
        minisiteData: [],
        allPageCount: 0,
        siteList: []
    }

    try {
        const res = await axios.post(`${back_api}/minisite/load_minisite`, { nowPage, search })
        if (res.status == 200) {
            data.minisiteData = res.data.minisiteData;
            data.allPageCount = res.data.allPage;
            data.siteList = res.data.site_list
            data.pageArr = getPagination(parseInt(nowPage), res.data.allPage);
        }

        return data
    } catch (error) {

    }
}

export async function minisite2Load(url) {
    const data = {
        minisiteData: [],
        pageArr: [],
        allPageCount: 0,
    }

    const nowPage = url.searchParams.get('page') || 1;

    try {
        const res = await axios.post(`${back_api}/minisite/load_land_minisite`, { nowPage })
        if (res.status == 200) {
            data.minisiteData = res.data.land_minisite_data;
            data.allPageCount = res.data.allPage
            data.pageArr = getPagination(parseInt(nowPage), res.data.allPage);
        }
    } catch (err) {
        console.error(err.message);
    }

    return data
}

// DB 불러올때 쓰는 함수

function getColorByStatus(status, statusArr, colorArr) {
    const index = statusArr.indexOf(status);
    return index !== -1 ? colorArr[index] : null;
}