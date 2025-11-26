import fs from "fs";
import path from "path";

type InvitationData = {
  themeName: string;
  formData: any;
};

function getFontLinks() {
  return [
    "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500;1,600;1,700&family=Great+Vibes&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;1,300;1,400;1,500&display=swap",
  ];
}

export function generateInvitationHTML(data: InvitationData) {
  const { themeName, formData } = data;

  // 1. Baca konten dari template.html
  const templatePath = path.join(process.cwd(), "public", "template.html");
  let templateHtml = fs.readFileSync(templatePath, "utf-8");

  // 2. Siapkan data yang akan disuntikkan
  const propsToInject = {
    themeName: themeName,
    data: {
      bride: formData.text.couple.brideFullName,
      groom: formData.text.couple.groomFullName,
      eventDate: new Date(formData.text.event.receptionDate),
      title: `The Wedding of ${formData.text.couple.brideFullName} & ${formData.text.couple.groomFullName}`,
      location: formData.text.event.receptionLocation,
      slug: "undangan",
      description: formData.text.closing.paragraph1,
      config: formData,
    },
    config: formData,
  };

  // 3. Ganti placeholder dengan data dan link font
  const fontLinksHtml = getFontLinks().map(link => `<link href="${link}" rel="stylesheet">`).join("\n");
  templateHtml = templateHtml.replace("<!-- FONT_LINKS_PLACEHOLDER -->", fontLinksHtml);
  templateHtml = templateHtml.replace("<!-- DATA_PLACEHOLDER -->", JSON.stringify(propsToInject));

  return templateHtml;
}

export default generateInvitationHTML;
