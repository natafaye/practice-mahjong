/**
 * Generates a CSS box-shadow property value that makes the element look like it has 3D thickness
 */
export const generateBoxShadow = (height: number, tipped: boolean, topColor: string, bottomColor: string) => {
    let shadow = ""
    for (let i = 0; i < height; i++) {
        shadow += `${i}px ${i * (tipped ? -1 : 1)}px 0 ${i >= height / 2.5 ? topColor : bottomColor}, `
    }
    shadow += `${height * 0.9}px ${height * 0.9}px 8px rgba(0, 0, 0, 0.5)`
    return shadow
}