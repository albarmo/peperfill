import { useParams } from "@remix-run/react";
import { themeRegistry } from "@/themes/registry";

interface PreviewData {
  theme: keyof typeof themeRegistry;
  config: {
    name: string;
    displayName: string;
    previewUrl: string;
    audioUrl: string;
    backgrounds: {
      leftSide: string;
      cover: string;
      main: string;
      mainCover: string;
      countdown: string;
    };
    images: {
      bride: string;
      groom: string;
      closingCarousel: string[];
      gallery: string[];
    };
    text: {
      cover: {
        title: string;
        to: string;
        guest: string;
        button: string;
      };
      mainCover: {
        title: string;
      };
      intro: {
        basmalah: string;
        paragraph: string;
      };
      couple: {
        intro: string;
        brideFullName: string;
        brideParents: string;
        brideInstagram: string;
        groomFullName: string;
        groomParents: string;
        groomInstagram: string;
      };
      event: {
        title: string;
        akadTitle: string;
        akadIntro: string;
        akadDate: string;
        akadTime: string;
        akadLocationIntro: string;
        akadLocation: string;
        akadAddress: string;
        receptionTitle: string;
        receptionIntro: string;
        receptionDate: string;
        receptionTime: string;
        receptionLocationIntro: string;
        receptionLocation: string;
        receptionAddress: string;
      };
      closing: {
        paragraph1: string;
        paragraph2: string;
      };
      [key: string]: {
        [key: string]: string;
      };
    };
  };
  data: {
    bride: string;
    groom: string;
    eventDate: string;
    location: string;
    title: string;
    slug: string;
    description: string;
  };
}

export default function PreviewPage() {
  const { data } = useParams();
  
  try {
    // Decode data dari parameter URL
    const decodedString = decodeURIComponent(atob(data || ""));
    const decodedData = JSON.parse(decodedString) as PreviewData;
    const { theme, config, data: invitationData } = decodedData;

    // Dapatkan komponen tema yang sesuai
    const ThemeComponent = themeRegistry[theme.toLowerCase() as keyof typeof themeRegistry]?.component;

    if (!ThemeComponent) {
      return (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-red-500">Theme not found</p>
        </div>
      );
    }

    return (
      <div className="min-h-screen">
        <ThemeComponent
          config={config}
          data={{
            ...invitationData,
            config,
            eventDate: new Date(invitationData.eventDate)
          }}
        />
      </div>
    );
  } catch (error) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">Invalid preview data</p>
      </div>
    );
  }
}