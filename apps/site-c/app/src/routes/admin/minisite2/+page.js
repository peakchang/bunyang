import { minisite2Load } from "$core/load.js"

// 사이트 접속시 user_info store 값에 user 정보 넣기
export const load = async ({ url }) => {

    let getData = {};

    getData = await minisite2Load(url);

    return getData
}