import { redirect } from '@sveltejs/kit';
import { back_api } from "$core/const";
import axios from 'axios';

import { user_info } from "$core/store";

export async function handle({ event, resolve }) {

    let userInfo = {}
    const refreshToken = event.cookies.get('tk'); // 쿠키에서 Refresh Token 가져오기
    // console.log(`refreshToken : ${refreshToken}`);

    const cookieHeader = event.request.headers.get('cookie') || '';
    // console.log(`cookieHeader : ${cookieHeader}`);

    if (refreshToken) {
        try {
            const res = await axios.get(`${back_api}/auth/auth_chk_token`, {
                headers: {
                    Cookie: cookieHeader,
                },
            });

            userInfo = res.data.userInfo
        } catch (error) {
            event.cookies.delete('tk', { path: '/' });
            console.error(error.message);
        }
        // const getUserInfoQuery = "SELECT * FROM users WHERE refresh_token = ?";
        // const [userInfoRow] = await sql_con.promise().query(getUserInfoQuery, [refreshToken]);

        // if (userInfoRow.length > 0) {
        //     userInfo = {
        //         id: userInfoRow[0].userid,
        //         name: userInfoRow[0].nick,
        //         email: userInfoRow[0].user_email,
        //         rate: userInfoRow[0].rate
        //     }
        //     console.log(userInfo);

    } else {
        event.cookies.delete('tk', { path: '/' });
    }

    // 클라이언트 측으로 값을 전달
    event.locals.user_info = userInfo;

    const res = await resolve(event); // 요청 처리
    return res;
}