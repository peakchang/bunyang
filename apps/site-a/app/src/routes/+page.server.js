export const load = ({ request }) => {

    console.log('server in!!!');

    const ua = request.headers.get('user-agent') ?? '';
    const isMobile = /Android|iPhone|iPad|iPod|Mobile/i.test(ua);

    console.log(isMobile);

    return { isMobile };
};