import { gcs_img } from "$lib/const";
import { back_api, back_api_origin } from "$core/const";

// 백그라운드 스타일은 그냥 여기서 빼버리자 ㅋㅋ
export function setImg(imgUrl) {

    console.log(imgUrl);

    // 백그라운드 이미지가 없으면 바로 리턴
    if (!imgUrl) {
        return;
    }
    let setImgUrl = "";

    // 포함 여부에 따라 순차적으로 처리
    if (imgUrl.includes("http")) {
        console.log('들어와야지?!?!');
        const u = new URL(imgUrl);
        if (u.hostname.startsWith('api.')) return url;
        u.protocol = 'https:';
        u.hostname = `api.${u.hostname}`;

        setImgUrl = u.toString();

        console.log(setImgUrl);

    } else if (imgUrl.includes("subimg")) {
        setImgUrl = `${back_api_origin}${imgUrl}`;
    } else if (imgUrl.includes("img")) {
        setImgUrl = `https://api.richby.co.kr/img/${imgUrl}`
    } else {
        setImgUrl = `${gcs_img}/${imgUrl}`;
    }
    return setImgUrl;
}