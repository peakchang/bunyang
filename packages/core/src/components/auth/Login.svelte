<script>
    import { goto } from "$app/navigation";
    import { page } from "$app/stores";

    import { user_info } from "$core/store.js";
    import { back_api } from "$core/const.js";

    import axios from "axios";

    let siteName = $state("");

    if (import.meta.env.VITE_BUCKET.includes("adpeak")) {
        siteName = "탑분양";
    } else if (import.meta.env.VITE_BUCKET.includes("with")) {
        siteName = "위드분양";
    } else {
        siteName = "리치분양";
    }

    let userId = $state("");
    let userPwd = $state("");

    let userIdInput = $state();

    let moveUrl = $state("");

    $effect(() => {
        moveUrl = $page.url.searchParams.get("url");
        console.log(moveUrl);

        if ($user_info.id) {
            alert("이미 로그인 되어 있습니다.");
            goto("/");
        } else {
            userIdInput.focus();
        }
    });

    async function loginFormSubmit(e) {
        e.preventDefault();
        console.log(moveUrl);

        if (!userId || !userPwd) {
            alert("아이디와 비밀번호를 모두 입력하세요.");
            return;
        }
        try {
            const res = await axios.post(
                `${back_api}/auth/login`,
                {
                    userid: userId,
                    password: userPwd,
                },
                { withCredentials: true },
            );

            console.log("res.data");
            console.log(res.data);

            if (res.status) {
                const moveUrl = $page.url.searchParams.get("url");
                console.log(moveUrl);

                if (moveUrl) {
                    location.href = moveUrl;
                } else {
                    console.log($user_info);

                    goto("/");
                }
            }
        } catch (err) {
            if (err.response) {
                alert(err.response.data.message);
            } else {
                console.error("네트워크 에러 발생! 잠시 후 다시 시도해주세요!");
            }
        }
    }
</script>

<div id="container-wrapper">
    <div class="container">
        <h2 class="text-2xl">{siteName} 로그인</h2>
        <form on:submit={loginFormSubmit}>
            <div class="input-group">
                <label for="username">아이디</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        id="username"
                        placeholder="아이디를 입력하세요"
                        bind:this={userIdInput}
                        bind:value={userId}
                    />
                    <svg
                        class="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"
                        ></path>
                        <circle cx="12" cy="7" r="4"></circle>
                    </svg>
                </div>
            </div>

            <div class="input-group">
                <label for="password">비밀번호</label>
                <div class="input-wrapper">
                    <input
                        type="password"
                        id="password"
                        placeholder="비밀번호를 입력하세요"
                        bind:value={userPwd}
                    />
                    <svg
                        class="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"
                        ></rect>
                        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                    </svg>
                </div>
            </div>

            <!-- <div class="input-group">
                <label for="search">검색</label>
                <div class="input-wrapper">
                    <input
                        type="text"
                        id="search"
                        placeholder="검색어를 입력하세요"
                    />
                    <svg
                        class="input-icon"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#999"
                        stroke-width="2"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                    >
                        <circle cx="11" cy="11" r="8"></circle>
                        <path d="m21 21-4.35-4.35"></path>
                    </svg>
                </div>
            </div> -->

            <button type="submit">로그인</button>
        </form>
    </div>
</div>

<style>
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    #container-wrapper {
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 20px;
    }

    .container {
        background: white;
        padding: 40px;
        border-radius: 20px;
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
        width: 100%;
        max-width: 500px;
    }

    h2 {
        margin-bottom: 30px;
        color: #333;
        text-align: center;
    }

    .input-group {
        position: relative;
        margin-bottom: 25px;
    }

    .input-wrapper {
        position: relative;
        display: flex;
        align-items: center;
    }

    .input-icon {
        position: absolute;
        left: 15px;
        width: 20px;
        height: 20px;
        pointer-events: none;
        z-index: 1;
    }

    input {
        width: 100%;
        padding: 15px 15px 15px 50px;
        border: 2px solid #e0e0e0;
        border-radius: 12px;
        font-size: 16px;
        transition: all 0.3s ease;
        outline: none;
    }

    input:focus {
        border-color: #667eea;
        box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
    }

    label {
        display: block;
        margin-bottom: 8px;
        color: #555;
        font-weight: 500;
        font-size: 14px;
    }

    button {
        width: 100%;
        padding: 15px;
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        border: none;
        border-radius: 12px;
        font-size: 16px;
        font-weight: 600;
        cursor: pointer;
        transition:
            transform 0.2s ease,
            box-shadow 0.2s ease;
        margin-top: 10px;
    }

    button:hover {
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(102, 126, 234, 0.4);
    }

    button:active {
        transform: translateY(0);
    }
</style>
