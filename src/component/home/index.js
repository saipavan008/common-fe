import React from 'react';
import {images} from "../../../constant";

function Index(props) {
    return (
        <React.Fragment>

            <div className="container">
                <div className="homepage">

                    <header className="hero-section">
                        <div className="row align-items-center">
                            <div className="col">
                                <h1>Frugy — Fresh Fruits & Dry Fruits, Delivered Daily 🍏🥭</h1>
                                <p className="tagline">Nourish Your Body. Energize Your Day. Simplify Your Life.</p>
                                <button className="btn btn-primary">Subscribe Now</button>
                            </div>
                            <div className="col">
                                <img src={images.homeFruits.default.src} className='img-fluid' alt=""/>
                            </div>
                        </div>
                    </header>

                    <section className="why-frugy">
                        <h2>Fuel Your Health with Every Delivery 🚀</h2>
                        <p>
                            At Frugy, we bring you the purest gifts of nature — handpicked fruits and premium dry fruits —
                            delivered fresh to your doorstep, every single day. Designed for your health, energy, and vitality,
                            Frugy makes healthy living effortless and joyful.
                        </p>
                    </section>

                    <section className="benefits">
                        <h2>Why Choose Frugy? 🍇</h2>
                        <ul>
                            <li><strong>Nutrient-Rich Goodness:</strong> Packed with vitamins, antioxidants, natural sugars, and healthy calories to boost your energy levels and immune system.</li>
                            <li><strong>Daily Fresh Deliveries:</strong> Start your mornings with farm-fresh fruits and hand-selected dry fruits — picked at peak ripeness for maximum nutrition.</li>
                            <li><strong>Tailored Monthly Subscriptions:</strong> Flexible and personalized plans designed to match your health goals and lifestyle.</li>
                            <li><strong>Healthy Calories for Sustained Energy:</strong> Ideal for muscle recovery, energy replenishment, and overall wellness.</li>
                            <li><strong>Trusted Sourcing, Transparent Quality:</strong> Certified farms and pure, preservative-free freshness in every box.</li>
                        </ul>
                    </section>

                    <section className="how-it-works">
                        <h2>How Frugy Works 🛒</h2>
                        <div className="steps">
                            <div className="step">1. Choose Your Subscription Plan</div>
                            <div className="step">2. We Handle the Rest</div>
                            <div className="step">3. You Enjoy Healthy Living</div>
                        </div>
                    </section>

                    <section className="health-benefits">
                        <h2>Health Benefits at a Glance 🍎✨</h2>
                        <table>
                            <thead>
                            <tr>
                                <th>Nutrient</th>
                                <th>Benefits</th>
                            </tr>
                            </thead>
                            <tbody>
                            <tr>
                                <td>Vitamins A, C, E</td>
                                <td>Boosts immunity and skin health</td>
                            </tr>
                            <tr>
                                <td>Natural Sugars</td>
                                <td>Provides instant, sustained energy</td>
                            </tr>
                            <tr>
                                <td>Dietary Fiber</td>
                                <td>Supports digestion and gut health</td>
                            </tr>
                            <tr>
                                <td>Good Calories</td>
                                <td>Perfect for strength, stamina, and weight management</td>
                            </tr>
                            <tr>
                                <td>Antioxidants</td>
                                <td>Fights free radicals and reduces inflammation</td>
                            </tr>
                            </tbody>
                        </table>
                    </section>

                    <section className="testimonials">
                        <h2>What Our Customers Say ❤️</h2>
                        <blockquote>
                            "Since subscribing to Frugy, I feel more energetic throughout the day. The quality is unmatched!"
                            <cite>— Nikhil V.</cite>
                        </blockquote>
                        <blockquote>
                            "Frugy makes healthy living easy. Every delivery is fresh, delicious, and full of life!"
                            <cite>— Shraddha P.</cite>
                        </blockquote>
                    </section>

                </div>
            </div>

        </React.Fragment>
    );
}

export default Index;