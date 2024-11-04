export const generateSecureHeader = (data: { [key: string]: unknown }) => {
    const {
        userAgent,
        languages,
        platform
    } = navigator

    return encodeURIComponent(JSON.stringify({
        userAgent, languages: languages, platform, ...data
    }))
}