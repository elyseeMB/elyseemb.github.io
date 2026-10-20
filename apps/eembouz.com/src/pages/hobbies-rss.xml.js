// src/pages/hobbies-rss.xml.js
import rss from "@astrojs/rss";

export async function GET(context) {
  // Importer vos données d'images depuis src/data/
  const dataFiles = import.meta.glob("../data/hobbies-gallery.json", {
    eager: true,
  });

  // Extraire les images
  const images = Object.values(dataFiles).flatMap((file) => file.default || []);

  // Créer les items du flux RSS
  const items = images.map((img) => ({
    title: img.title || "Photo",
    description: `<img src="${img.src}" width="${img.width}" height="${
      img.height
    }" alt="${img.title || ""}" />`,
    link: `${context.site}${img.src}`,
    pubDate: img.pubDate ? new Date(img.pubDate) : new Date(),
    content: `<img src="${img.src}" width="${img.width}" height="${
      img.height
    }" alt="${img.title || ""}" />`,
  }));

  items.sort((a, b) => b.pubDate - a.pubDate);

  return rss({
    title: "My Hobbies Gallery",
    description: "Photos de mes hobbies et passions",
    site: context.site,
    items: items,
    customData: `<language>fr-CA</language>`,
  });
}
