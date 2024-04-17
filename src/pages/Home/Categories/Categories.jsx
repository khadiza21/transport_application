import React from 'react';
import SectionTitle from '../Components/SectionTitile';

const Categories = () => {

    return (
        <section className='py-48'>
            <SectionTitle
                subHeading={"From 08.00am to 10.00pm"}
                heading={"Categories"}
            >

            </SectionTitle>
            <div class="grid grid-cols-2 gap-4 px-48 ">

                <div>set 1 Lorem, ipsum dolor sit amet consectetur adipisicing elit. Veritatis totam officia odit tempora nulla, illum, numquam repudiandae explicabo vitae animi omnis eligendi ab recusandae quia, atque autem praesentium ex fugit consequatur et ducimus accusantium. Vel, eaque laudantium facere nulla architecto doloribus aliquam suscipit. Sunt beatae reprehenderit impedit expedita aperiam, magni id quos deleniti. Obcaecati, sequi necessitatibus minus quis eum quae!</div>
                <div>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quis alias consequatur saepe nostrum, culpa esse eos animi neque modi corrupti nam aliquid sint quae voluptatum consectetur quam vel exercitationem, sit in deleniti ullam quaerat possimus quo praesentium? Corrupti ullam voluptatum eum doloribus animi accusamus est?
                </div>


            </div>
        </section>
    );
};

export default Categories;