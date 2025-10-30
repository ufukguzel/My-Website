import { sharedMetadata } from '@/lib/shared-metadata';
import {
    PlayIcon,
    AppleIcon,
    CalendarIcon
} from "lucide-react";

export default function AppPolicyPage_English() {
    return (
        <div className="space-y-8">
            <h1 className="text-3xl font-bold">Privacy Policy and Terms of Use</h1>
            <hr />
            <p>
                The privacy policy and terms of use stated herein apply to all mobile applications of Ufuk GÜZEL published on Google Play Store and IOS App Store. By installing these applications on your mobile device, you are deemed to have accepted the privacy policy and terms of use contained in this text. If you do not accept these terms, do not install these applications on your mobile device.
            </p>

            <ul className="list-disc pl-4 pt-2">
            </ul>
            <p>
                You can send your opinions and suggestions regarding the conditions specified herein to {sharedMetadata.email} e-mail address.
            </p>
            <hr />

            <div className='row md-12'>
                <div><b>Store Links: </b></div>
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
                    <b>Last Update Date:</b>
                    <span>10/02/2024</span>
                </div>
            </div>

        </div>
    );
}