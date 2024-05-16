import RenderPage from "@/app/settings/licenses/render-client";
import { loadLicenses } from "@/lib/licenses";

const licenses = await loadLicenses();

export default function Page() {
	return <RenderPage licenses={licenses} />;
}
