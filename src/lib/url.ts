export const handleUrl = (url: string): string => {
    if (url.startsWith("https://")) {
        return url;
    } else if (url.startsWith("http://")) {
        return url;
    }
    return "https://" + url;
}