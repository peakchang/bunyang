import { miniWindow } from "$core/load.js"

// 사이트 접속시 user_info store 값에 user 정보 넣기
export const load = async ({ params }) => {
    let getData = {};
    getData = await miniWindow(params);
    return getData
}