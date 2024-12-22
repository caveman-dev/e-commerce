import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import React from 'react';

type Prop = {
    children: React.ReactNode
};
const FooterContainer = ({ children }:Prop) => {
    console.log();
    return (
        <div className="pl-2 pr-2">
            {children}
            <div className="w-full bg-primary text-primary-reverse mt-6 pt-6 ">

                <div className="w-full">
                    <footer className="footer w-full  flex grid justify-content-evenly">
                        <section className="footer-brand col-3 p-2">
                            <h2>Corals Clothing</h2>
                            <p>Discover your unique style with Corals, where floral meets color!</p>
                        </section>

                        <section className="footer-navigation col-1 p-2">
                            <h3>Shop</h3>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer ">
                                Summer Collection
                            </div>
                            <div
                                className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer "
                                // href="/ethnic"
                            >
                                Ethnic Wear
                            </div>
                            <div
                                className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer "
                                // href="/casual"
                            >
                                Casual Wear
                            </div>
                            <div
                                className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer "
                                // href="/formal"
                            >
                                Formal Wear
                            </div>
                        </section>

                        <section className="footer-navigation col-1.5 p-2">
                            <h3>Customer Service</h3>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer ">Help & Support</div>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer ">Shipping & Delivery</div>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer ">Returns & Refunds</div>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer ">Contact Us</div>
                        </section>

                        <section className="footer-social col-1 p-2">
                            <h3>Follow Us</h3>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer flex">
                                <i className="pi pi-instagram" />
                                <div>&nbsp;Instagram</div>
                            </div>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer  flex">
                                <i className="pi pi-facebook" />
                                <div>&nbsp;Facebook</div>
                            </div>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer flex">
                                <i className="pi pi-twitter" />
                                <div>&nbsp;Twitter </div>
                            </div>
                        </section>

                        <section className="footer-newsletter col-2 p-2">
                            <h3>Subscribe to our Newsletter</h3>
                            <div className="flex-column">
                                <InputText className="w-full" type="email" placeholder="Enter your email" />
                                <div className="w-full flex justify-content-end pr-3 pt-1">
                                    <Button label="Subscribe" outlined className="bg-primary-reverse " />
                                </div>
                            </div>
                        </section>

                        <section className="footer-payment col-1 p-2">
                            <h3>Payment Methods</h3>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer flex">Visa</div>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer flex">MasterCard</div>
                            <div className="p-2 hover:bg-primary-reverse hover:text-primary border-round-lg cursor-pointer flex">PayPal</div>
                        </section>

                    </footer>
                </div>
                <div className="flex w-full align-items-center  justify-content-end">
                    <section className="footer-legal flex justify-content-end">
                        <div className="p-2 cursor-pointer">Terms & Conditions</div>
                        <div className="p-2 cursor-pointer">Privacy Policy</div>
                        <div className="p-2 cursor-pointer">Cookie Policy</div>
                    </section>

                    <section className="footer-copyright">
                        <p>&copy; 2024 Corals Clothing. All rights reserved.</p>
                    </section>
                </div>
            </div>
        </div>
    );
};

export default FooterContainer;
