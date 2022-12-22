import React, { Fragment, useEffect } from 'react';
// import  WordCloud  from './wordcloud2.js'; // Or the extension could be just `.js`


function Pedidos() {

    

    useEffect(() => {
        // console.log('IsEnabled= ', WordCloud.isSupported)
            
        // WordCloud.stop();

        // WordCloud('legionario', 
        // {list : [['Amazon', 100,'wwww.amazon.com'],['Google', 180, 'www.google.com'],['Yahoo', 60, 'wwww.yahoo.com']], 
        // fontWeight: 'Bold', 
        // click: (e) => {
        //     console.log('Hello > ', e[2])
            
        //     window.open(e[2]);
        //     }
        // })

        // WordCloud.minFontSize()
        
    }, [])

    return ( 
        <Fragment>

            <h2>Pedidos</h2>

            {/* <div id="legionario" className='legionarioStyle'>


            </div> */}

        </Fragment>
     );
}
 
export default Pedidos;