let date = new Date()
date = date.getFullYear()

document.querySelector('#date').insertAdjacentHTML("afterbegin", date)

let y_top_objectEl = document.querySelectorAll('.scroll-y-top-el')
let y_down_objectEl = document.querySelectorAll('.scroll-down-top-el')
let x_top_objectEl = document.querySelectorAll('.scroll-x-top-el')
let x_down_objectEl = document.querySelectorAll('.scroll-x-down-el')

objectEl(y_top_objectEl, 'Y', '+')
objectEl(y_down_objectEl, 'Y', '-')
objectEl(x_top_objectEl, 'X', '+')
objectEl(x_down_objectEl, 'X', '-')

function objectEl(elementClass, axis, sign){
    for (let element of elementClass){
        let observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting){
                    element.style.transform = `translate${axis}(0)`
                }else{
                    element.style.transform = `translate${axis}(${sign}50%)`
                }
            })
        })
        
        observer.observe(element)
    }
    
}

/////////////////////
/////////////////////
////  FORM DATA  ////
/////////////////////
/////////////////////

try {
    document.querySelector('#mc-embedded-subscribe-form').addEventListener('submit', async function(event){
        event.preventDefault();
        let form = event.target;
        let url = form.action;

        // Create FormData object from the form
        let form_data = new FormData(form);
        // Convert FormData to JSON object
        let obj = Object.fromEntries(form_data);

        try {
            // Send the JSON object to the server
            const response = await uploadForm(JSON.stringify(obj), url);
            const result = await response.json();
            if (response.ok) {
                if (result.result.email){
                    for (let i of result.result.email)
                    alert(i);
                } else if (result.result.message){
                    alert(result.result.message);
                    window.location.reload();
                }

                //alert(result);
                //window.location.reload();
            } else {
                alert('Subscription failed: ' + result.error,);
            }
        } catch (error) {
            alert('Subscription error: ' + error.message);
        }
    });
} catch (TypeError) {
    console.error(TypeError);
}

async function uploadForm(data, url) {
    return fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: data
    }).then(response => {
        return {
            ok: response.ok,
            status: response.status,
            json: () => response.json()
        };
    }).catch(error => {
        throw new Error('Network error');
    });
}
