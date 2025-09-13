import React, {useContext, useEffect} from 'react';
import {Accordion, AccordionContext, useAccordionButton} from "react-bootstrap";
import {images} from "../../../constant";
import AOS from 'aos';
import 'aos/dist/aos.css';

function QuestionsAboutSection(props) {

    useEffect(() => {
        AOS.init({
            duration: 400,
            easing: 'ease-in-out',
            once: false,
        });
    }, []);

    const questionsData = [
        {question: 'What is Wash Agent?' , answer: 'The Wash Agent is an exclusive app that guides you through self-cleaning your car. Choose from various wash plans, and this intuitive tool provides step-by-step instructions, making car cleaning effortless and effective.'},
        {question: 'What is Daily wash plan?' , answer: 'The Wash Agent is an exclusive app that guides you through self-cleaning your car. Choose from various wash plans, and this intuitive tool provides step-by-step instructions, making car cleaning effortless and effective.'},
        {question: 'What is Pay as you go modal?' , answer: 'The Wash Agent is an exclusive app that guides you through self-cleaning your car. Choose from various wash plans, and this intuitive tool provides step-by-step instructions, making car cleaning effortless and effective.'},
        {question: 'How wallet works?' , answer: 'The Wash Agent is an exclusive app that guides you through self-cleaning your car. Choose from various wash plans, and this intuitive tool provides step-by-step instructions, making car cleaning effortless and effective.'},
        {question: 'Who is eligible for rewards?' , answer: 'The Wash Agent is an exclusive app that guides you through self-cleaning your car. Choose from various wash plans, and this intuitive tool provides step-by-step instructions, making car cleaning effortless and effective.'},
    ];


    const ContextAwareToggle = ({ children, eventKey, callback }) => {
        const { activeEventKey } = useContext(AccordionContext);

        const decoratedOnClick = useAccordionButton(
            eventKey,
            () => callback && callback(eventKey),
        );
        const isCurrentEventKey = activeEventKey === eventKey ||
            (Array.isArray(activeEventKey) && activeEventKey.includes(eventKey));
        return (
            <button
                onClick={decoratedOnClick}
                className="w-100 text-start questions-accordion-button"
            >
                {children}
                {
                    isCurrentEventKey ?
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25"
                             fill="none">
                            <path d="M6 12.5H18M12 18.5V6.5" stroke="#333333" stroke-width="2"
                                  stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                        :
                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="25" viewBox="0 0 24 25"
                             fill="none">
                            <path d="M6 12.5H18" stroke="#333333" stroke-width="2" stroke-linecap="round"
                                  stroke-linejoin="round"/>
                        </svg>
                }
            </button>
        );
    }

    return (
        <React.Fragment>
            <div className="container questions-about-section">
            <div className="col-md-10 mx-auto">
                <div className="row justify-content-between">
                        <div className="col-md-7" data-aos-delay={'50'} data-aos={'fade-right'}>
                            <h2 className="mb-md-4 mb-3">Have questions about wash agent?</h2>
                            <Accordion defaultActiveKey="0">
                                {
                                    questionsData?.map((item, index, arr) => {
                                        const isLast  = arr.length - 1  === index;
                                        return (
                                            <div className={`col-12 ${isLast ? '' : 'border-bottom pb-md-20 mb-md-20 pb-12 mb-12'}`}>
                                                <ContextAwareToggle
                                                    eventKey={index.toString()}>
                                                    <h4 className="mb-0">{item?.question}</h4>
                                                </ContextAwareToggle>
                                                <Accordion.Collapse eventKey={index.toString()}>
                                                    <h6 className="mb-0 mt-2 text-secondary">{item?.answer}</h6>
                                                </Accordion.Collapse>
                                            </div>
                                        )
                                    })
                                }
                            </Accordion>
                        </div>
                        <div className="col-md-auto mt-md-5 mt-4">
                            <div className="col-12  question-card-image" data-aos-delay={'50'} data-aos={'flip-down'}>
                                <img src={images.questionsCard.default.src} className="img-fluid" alt="question"/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
}

export default QuestionsAboutSection;