import { useMenuStore } from "@/lib/hooks/useMenuStore"
import CoverWidget from "@/ui/widgets/CoverWidget"
import QuoteWidget from "@/ui/widgets/QuoteWidget"

const _RenderContent = (contentId:string) => {
  switch (contentId) {
    case 'cover':
      return <CoverWidget />
    case 'quotes':
      return <QuoteWidget/>
    case 'bride':
      return <div>Bride</div>
    case 'groom':
      return <div>Groom</div>
    case 'event':
      return <div>Event</div>
    case 'rsvp':
      return <div>RSVP</div>
    case 'gift':
      return <div>Gift</div>
    case 'thanks':
      return <div>Thanks</div>
    default:
      return <div>Error</div>
  }
}

export default function Index() {
  const content = useMenuStore((s) => s.activeMenu);

  return (
    <div className="w-full overflow-hidden">
      {_RenderContent(content?.id as string)}
    </div>
  );
}
