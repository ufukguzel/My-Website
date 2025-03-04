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
                <li>
                    Our applications do not collect any personal information belonging to you and do not make any request from you in this direction.
                </li>
                <li>
                    The location permission requested in the application named "Getmar" is for the purpose of showing the markets close to the location on the map. This location information is not recorded anywhere and is not shared with any location. There is no obligation to give permission for the location, the user may not allow the location if they wish. If the location is not allowed or is switched off, the programme provides a general map view.
                </li>
                <li>
                    The "BabySleeper" application is an application developed for families and children and does not store any data; it has a commitment to comply with the Play Family Policy.
                </li>
                <li>
                    The "Whistle SOS" app is an all-ages app developed for relief purposes and does not store any data; it has a commitment to comply with the Play Family Policy.
                </li>
                <li>
                    The "Simple ToDo" application stores user data (e-mail, password, to-do list) in the Firebase structure provided by Google. The data is not processed for either short or long periods of time. No personal data, including user device information, is stored.
                </li>
                <li>
                    No personal data, including user device information, is stored in the "Random Quotes" application.
                </li>
            </ul>

            <p>
                We always show the necessary care and sensitivity to publish quality and useful applications. However, we make no commitment that the content in our applications will meet your expectations, be useful to you or contain accurate information. We present the applications as they are. For this reason, you agree that you cannot hold Osman KOÇ responsible for any negative situation arising from our applications.
            </p>
            <p>
                We strive to the extent necessary to take all measures that can be taken for the security of these applications and fulfil our obligations under the Google Play Developer Programme Policies agreement. However, the internet and digital environments are not sufficiently secure areas. Therefore, we do not guarantee that we will provide you with a one hundred per cent secure service. Our applications are only available on Google Play Store and IOS App Store. In the event that these applications are available on another platform without our knowledge, Osman KOÇ cannot be held responsible for the downloads to be made from here.
            </p>
            <p>
                These applications may contain advertisements and links belonging to third parties. You agree that Osman KOÇ cannot be held responsible for the nature, content, security or damages that may arise from these third-party advertisements and links. You can learn how to adjust your settings regarding the advertisements published by Google on the <a href="https://www.google.com/settings/ads">advertisement settings</a> page.
            </p>
            <p>
                All kinds of copyrights regarding all content consisting of audio, written and visual elements and software in these applications belong to Osman KOÇ. Any of our applications or the copyrighted content of these applications; copying, reproducing, republishing, republishing, disassembling, re-publicising, etc. You agree that you will not take actions.
            </p>
            <p>
                You can send your opinions and suggestions regarding the conditions specified herein to {sharedMetadata.email} e-mail address.
            </p>
            <p>
                Osman KOÇ reserves the right to make changes to this Privacy Policy and Terms of Use text. Changes made will take effect immediately. We indicate the date we make changes as the "last update date" at the bottom.
            </p>
            <p>
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