// 공통 유틸, API 호출, 타입, 상수 등
export function formatPhone(phone) {
    return phone.replace(/[^0-9]/g, "");
}

// 사이트별 분기용 공통 함수 예시
export function getSiteConfig(site) {
    const base = {
        companyName: "애드피크",
        defaultTitle: "분양 전문 애드피크",
    };

    const siteMap = {
        "site-a": {
            brand: "탑분양",
            themeColor: "#ff0000",
        },
        "site-b": {
            brand: "리치분양",
            themeColor: "#f5b400",
        },
        "site-c": {
            brand: "위드분양",
            themeColor: "#0066ff",
        },
    };

    return { ...base, ...(siteMap[site] ?? {}) };
}