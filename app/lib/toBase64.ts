async function toBase64(src: string): Promise<string> {
  try {
    const res = await fetch(src);
    const blob = await res.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.readAsDataURL(blob);
    });
  } catch (err) {
    console.warn(`Failed to load image: ${src}`, err);
    return src; // fallback ke URL asli kalau gagal
  }
}


export default toBase64
