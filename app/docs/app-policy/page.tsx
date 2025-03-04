import AppPolicyPage_English from "./en";
import AppPolicyPage_Turkish from "./tr";

export default function AppPolicyPage({
    searchParams,
}: {
    searchParams: { lang?: string };
}) {
    return searchParams.lang === 'tr' ? <AppPolicyPage_Turkish /> : <AppPolicyPage_English />;
}