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
                Burada belirtilen gizlilik politikası ve kullanım koşulları; Osman KOÇ'un Google Play Store ve IOS App Store'da yayınlanan bütün mobil uygulamaları için geçerlidir. Bu uygulamaları mobil cihazınıza yükleyerek, bu metinde yer alan gizlilik politikasını ve kullanım koşullarını kabul etmiş sayılırsınız. Bu koşulları kabul etmiyorsanız bu uygulamaları mobil cihazınıza yüklemeyiniz.
            </p>

            <ul className="list-disc pl-4 pt-2">
                <li>
                    Uygulamalarımız, size ait herhangi bir kişisel bilgiyi toplamaz ve sizden bu yönde bir talepte bulunmaz.
                </li>
                <li>
                    "Getmar" adlı uygulamada istenen konum izni, konuma yakın marketleri haritada göstermek amaçlıdır. Bu konum bilgisi hiçbir şekilde bir yere kayıt edilmez ve herhangi bir yerle paylaşım söz konusu değildir. Konum için izin verme zorunluluğu bulunmuyor, kullanıcı isterse konuma izin vermeyebilir. Konuma izin verilmediği veya kapalı olduğu taktirde program genel bir harita görünümü sunar.
                </li>
                <li>
                    "BabySleeper" uygulaması, aile ve çocuklar için geliştirilmiş, hiçbir veri tutmayan bir uygulama olmak üzere; Play Aile Politikası'na uyma taahhüdü var.
                </li>
                <li>
                    "Deprem Düdüğü (Whistle)" uygulaması, yardım amaçlı geliştirilmiş, her yaş grubuna uyan ve hiçbir veri tutmayan bir uygulama olmak üzere; Play Aile Politikası'na uyma taahhüdü var.
                </li>
                <li>
                    "Simple ToDo - Yapılacaklar" uygulaması kullanıcı verilerini (e-posta, şifre, yapılacak listesi) Google tarafından sunulan Firebase yapısında tutmaktadır. Veriler ne kısa ne de uzun süreli olarak işlenmemektedir. Kullanıcı cihaz bilgisi dahil olmak üzere, hiçbir kişisel veri tutulmamaktadır.
                </li>
                <li>
                    "Rastgele Alıntı ve Sözler" uygulaması içinde kullanıcı cihaz bilgisi dahil olmak üzere, hiçbir kişisel veri tutulmamaktadır.
                </li>
            </ul>

            <p>
                Kaliteli ve yararlı uygulamalar yayınlamak için her zaman gereken özeni ve duyarlılığı gösteriyoruz. Buna rağmen, uygulamalarımızda yer alan içeriklerin beklentilerinizi karşılayacağı, size yararlı olacağı veya kesin doğru bilgiler içereceğine dair hiçbir taahhütte bulunmamaktayız. Uygulamaları olduğu gibi sunmaktayız. Bu sebeple, uygulamalarımızdan kaynaklı yaşanacak herhangi bir olumsuz durum için Osman KOÇ'u sorumlu tutamayacağınızı kabul etmektesiniz.
            </p>
            <p>
                Bu uygulamaların güvenliği konusunda alınabilecek tüm önlemleri almak için gereken ölçüde çaba sarf etmekte ve Google Play Geliştirici Programı Politikaları sözleşmesi kapsamındaki yükümlülüklerini yerine getirmekteyiz. Bununla birlikte; internet ve dijital ortamlar yeterli düzeyde güvenli alanlar değildir. Bu yüzden size yüzde yüz güvenli bir hizmet sunacağımız konusunda herhangi bir garantide bulunmamaktayız.
            </p>
            <p>
                Bu uygulamalarda, üçüncü taraflara ait reklamlar ve linkler yer alabilir. Bu üçüncü taraflara ait reklamların ve linklerin niteliğinden, içeriğinden, güvenliğinden veya bunlardan kaynaklı oluşabilecek zararlardan Osman KOÇ sorumlu tutamayacağınızı kabul etmektesiniz. Google tarafından yayınlanan reklamlara ilişkin ayarlarınızı nasıl düzenleyeceğinizi, <a href="https://www.google.com/settings/ads">reklam ayarları</a> sayfasından öğrenebilirsiniz.
            </p>
            <p>
                Bu uygulamalarda yer alan sesli, yazılı ve görsel öğelerden ve yazılımlardan oluşan bütün içeriğe ilişkin her türlü telif hakkı Osman KOÇ’a aittir. Herhangi bir uygulamamızı veya bu uygulamaların telif haklarıyla korunan içeriğini; kopyalama, çoğaltma, yeniden yayımlama, parçalarına ayırma, tekrar kamuya sunma vb. eylemlerde bulunmayacağınızı kabul etmektesiniz.
            </p>
            <p>
                Burada belirtilen koşullarla ilgili görüş ve önerilerinizi, {sharedMetadata.email} mail adresinden iletebilirsiniz.
            </p>
            <p>
                Bu Gizlilik Politikası ve Kullanım Koşulları metninde değişiklik yapma hakkı Osman KOÇ'ta saklıdır. Yapılan değişiklikler anında yürürlüğe girecektir. Değişiklik yaptığımız tarihi, "son güncelleme tarihi" olarak en alt kısımda belirtiriz.
            </p>
            <hr />
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