import React from 'react';

export const Footer = () => {
    return (
        <section className="footer">
            <div className='box-container'>
                <div className='box'>
                    <a href='/' className="logo"><i className="bi bi-shop-window"></i>e-Grocery</a>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque id nulla tincidunt, blandit lacus nec, eleifend dui. Interdum et malesuada fames ac ante ipsum primis in faucibus. Nullam malesuada, turpis non venenatis volutpat, elit odio suscipit lorem, sed sollicitudin lorem ante ac lacus. Quisque vel venenatis nibh.</p>
                    <div className='share'>
                        <a href="/"><i className="bi bi-facebook"></i></a>
                        <a href="/"><i className="bi bi-twitter"></i></a>
                        <a href="/"><i className="bi bi-instagram"></i></a>
                        <a href="/"><i className="bi bi-linkedin"></i></a>
                    </div>
                </div>

                <div className='box'>
                    <h3>quick links</h3>
                    <div className='links'>
                        <a href="/">home</a>
                        <a href="/">categoty</a>
                    </div>
                </div>

                <div className='box'>
                    <h3>download app</h3>
                    <div className='links'>
                        <a href="/">google play</a>
                        <a href="/">window xp</a>
                        <a href="/">app store</a>
                    </div>
                </div>
            </div>

            <h1 className='credit'> created by <span>WRTeam</span> | all rights reserved!</h1>
        </section>
    );
};