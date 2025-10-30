import { sharedMetadata } from '@/lib/shared-metadata';
import {
    PlayIcon,
    AppleIcon,
    CalendarIcon
} from "lucide-react";

export default function AppPolicyPage_Turkish() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Gizlilik Politikası ve Kullanım Koşulları</h1>
            <hr />
            <p>
                Burada belirtilen gizlilik politikası ve kullanım koşulları; Ufuk GÜZEL'in Google Play Store ve IOS App Store'da yayınlanan bütün mobil uygulamaları için geçerlidir. Bu uygulamaları mobil cihazınıza yükleyerek, bu metinde yer alan gizlilik politikasını ve kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız bu uygulamaları mobil cihazınıza yüklemeyiniz.
            </p>
            <div className='row md-12'>
                <div><b>Mağaza Linkleri: </b></div>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <a href={sharedMetadata.urls.playStore} target='_blank'>
                        <PlayIcon size={16} /> Play Store
                    </a>
                    <b>&nbsp;&nbsp;</b>
                    <a href={sharedMetadata.urls.appStore} target='_blank'>
                        <AppleIcon size={16} /> AppStore
                    </a>
                </div>
            </div>
            <br />
            <div className='row md-12'>
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                    <CalendarIcon size={16} />
                    <b>Son Günceleme Tarihi:</b>
                    <span>10/02/2024</span>
                </div>
            </div>
        </div>
    );
}