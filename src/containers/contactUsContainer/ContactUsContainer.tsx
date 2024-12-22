import { InputTextarea } from 'primereact/inputtextarea';
import { Button } from 'primereact/button';
import { getJsonPath } from '../../utils/constants';

const ContactUsContainer = () => (
    <div className="w-full flex">
        <div
            className="w-6 "
        >
            <img
                src={getJsonPath('contactUs_2.webp')}
                alt="Blended "
                style={{
                    width: '100%',
                    height: '87vh',
                    objectFit: 'contain',
                    mixBlendMode: 'multiply', // Apply blend mode
                }}
            />
        </div>
        <div className="w-6 p-4 ">
            <div className="text-5xl font-medium font-italic w-full text-center mb-2">Contact Us</div>
            <div className="text-xl w-full text-center  mt-4">
                Got any questions about the product or scaling on
                our platform? We&apos;re here to help.
                Chat to our friendly team 24/7 and get onboard in less than 5 minutes.
            </div>
            <div className="pl-8">
                <div className="text-2xl font-semibold mt-5">Chat with us</div>
                <div className="text-lg w-full   text-bluegray-400 mt-1">
                    Speak to our friendly team via live chat.
                </div>
                <div className="text-xl w-full font-semibold flex align-items-center p-2 mt-1">
                    <i
                        className="pi pi-comments"
                        style={{ fontSize: '1rem' }}
                    />
                    &nbsp;
                    Start a live chat
                </div>
                <div className="text-xl w-full font-semibold flex align-items-center p-2 mt-1">
                    <i className="pi pi-send" style={{ fontSize: '1rem' }} />
                    &nbsp;
                    Shoot us an email
                </div>
                <div className="text-xl w-fullfont-semibold flex align-items-center p-2 mt-1">
                    <i
                        className="pi pi-twitter"
                        style={{ fontSize: '1rem' }}
                    />
                    &nbsp;
                    Message us on X
                </div>

                <div className="text-2xl font-medium w-full mt  -4 mb-2 mt-4">Call Us</div>
                <div className="text-lg w-full   text-bluegray-400 mt-1">
                    Call our team Mon-Fri from 8am to 5pm.
                </div>
                <div className="text-xl w-fullfont-semibold flex align-items-center p-2 mt-1">
                    <i
                        className="pi pi-phone"
                        style={{ fontSize: '1rem' }}
                    />
                    &nbsp;
                    +1(555) 000-0000
                </div>
                <div className="text-2xl font-medium w-full mt  -4 mb-2 mt-4">Visit Us</div>
                <div className="text-lg w-full   text-bluegray-400 mt-1">
                    Chat to us in person at our Mumbai HQ.
                </div>
                <div className="text-xl w-fullfont-semibold flex align-items-center p-2 mt-1">
                    <i
                        className="pi pi-map-marker"
                        style={{ fontSize: '1rem' }}
                    />
                    &nbsp;
                    Godrej One Commercial Project: Vikhroli, Mumbai
                </div>
                <div className="w-full flex align-items-center mt-2 ">
                    <InputTextarea
                        className="w-9"
                        autoResize
                        // value={value}
                        // onChange={(e) => setValue(e.target.value)}
                        rows={3}
                        // cols={60}
                    />
                    <div className="m-2 flex justify-content-end mt-1   ">
                        <Button label="Send Message" />
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ContactUsContainer;
