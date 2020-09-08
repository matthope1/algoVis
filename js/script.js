class array {
    constructor () {
        this.length = 0;
        this.data = [];
    }

    getElementAt(index){
        return data[index];
    }
    
    // TODO: 
    // create a set function

    append(key){
        this.data.push(key);
        this.length++;
    }
    
    delete(index) {
        if (index > -1) {
            this.data.splice(index, 1);
        }
    }

    linearSearch(key) {
        let index = -1;

        for (let i = 0; i < this.length; i++ ) {
            if (this.data[i] == key) {
                index = i;
                break;
            }
        }
        return index;
    }

    binarySearch(key) {

        let l = 0;
        let r = this.length - 1;

        let mid;
        while (l <= r) {

            mid = Math.round((l + r) / 2);

            if (this.data[mid] == key) {
                return mid;
            }
            else if(this.data[mid] < key) {
                l = mid + 1;
            }
            else {
                r = mid - 1;
            }
        }

        // we didnt find the key return not found
        return -1;
    }

    // We probably won't end up using this
    // as the visualization would probably be pretty hard to do

    // this still needs to be tested
    rBinarySearch(key, l, r) {

        if(l < r) {

            let mid = Math.round((l+ r) / 2);

            if (this.data[mid] == key) {
                return key;    
            }
            else if (this.data[mid] < key) {
                return this.rBinarySearch(key, mid + 1, r);
            }
            else { 
                return this.rBinarySearch(key, l, mid - 1);
            }
        }
        return -1;
    }

    sort() {
        this.data.sort(function(a,b){return a - b});
    }

    display(){
        console.log(this.data);
    }
}

function generateRandomArray() {

    let arr = new array();
    console.log("inside of generate random array function");
    // generate 10 random numbers (range: 1 - 100) and append them onto array
    let i = 0;

    while (i < 10) {
        let randomNum = Math.floor(Math.random() * 101);

        if(arr.linearSearch(randomNum) == -1) {
            arr.append(randomNum);
            i++;
        }
        else {
            continue;
        }
    }

    console.log("exiiting generate random array function");
    return arr;
}

function renderStoredArray(arr) {
    console.log("entering renderStoredArray function");
    let arrayElement;
    // first clear any array that is currently being displayed
    // $(`.array-element`).remove();

    //hide the current displayed array
    // then in a call back function remove that array from the markup 

    $(`.array-element`).hide('slow',function() {
        $(`.array-element`).remove(function() {
            console.log("did we go in here");
            for (let i = 0; i < arr.length; i ++) {
                // create a div element with the class of array-element
                arrayElement = document.createElement("div");
                arrayElement.className = `array-element index-${i}`;
                arrayElement.innerHTML = arr.data[i];

                // append each array element onto the display section 
                $(".display").append(arrayElement);
            }
        });
    });

    console.log("exiting renderStoredArray function");
}

function deleteItem(arr, callback) {

    
    // grab desired index from user via prompt
    const index = parseInt(prompt("which element do you want to remove?"));

    arr.delete(index);
    // remove the div with the class box-index
    $(`.array-element.index-${index}`).hide('slow', function() {
        // you could also try changing the color of the element to red for a moment before the element gets deleted
        
        // use of callback function so that the remove happens after the hide slow animation
            $(`.array-element.index-${index}`).remove();
    });

//     console.log(`.array-element index-${index}`);
//     console.log("array element removed");
//     //    console.log($(`.box.box-${index}`).innerHTML);

//     // change the class names on the rest of the elements to n - 1

//     // can you select by class name and then get classname?
//     console.log("printing class name of index 3 element...");
//     console.log($(`.array-element.index-3`).className);

//     // TODO:
//     // change the classnames by calling removeClass()
//     // and addClass()
//     // create a variable to store the current selected element so we dont have to type out
//     // .array-elements.index .....

//     for (let i = index + 1; i < 10; i ++) {
//         // console.log($(`.array-element.index-${i}`).html());
//         console.log("testing remove and add class functions");
//         // console.log($(`.array-element.index-${i}:`));
//         // new method
//         // $(`.array-element.index-${i}`).removeClass(`index-${i}`, function() {
            
//         //     $(this).addClass(`index-${i - 1}`);
//         // });

//         $(`.array-element.index-${i}`).addClass(`index-${i - 1}`, function() {
//             $(`.array-element.index-${i}`).removeClass(`index-${i}`);
//         });
// // $(`.array-element.index-${i}`).className = `.array-element index-${i - 1}`;
//     }

//     console.log("printing array...");
//     for (let i = index + 1; i < 10; i ++) {
//         console.log($(`.array-element.index-${i}`).html());
//     }
    
    console.log("returning  from delete item now checking callback...");

    // referenced this
    // https://www.geeksforgeeks.org/how-to-create-a-custom-callback-in-javascript/#:~:text=All%20functions%20in%20JavaScript%20are,keyword%20as%20the%20last%20parameter.

    if (typeof callback == "function") {
        callback();
    }

    return arr;
}


$(document).ready(function(){

    console.log("document ready");

    let arr; 
    
    $(".generate-array").on('click', function() {
        //TODO: 
        // change generateRandomArray so that it can take a callback argument
        // then use that to call renderStoredArray only after gra has completed running
        arr = generateRandomArray();
        renderStoredArray(arr);
    });

    $(".delete-item-button").on('click', function() {
        deleteItem(arr, function() {
            console.log("do we go in here?");
            // refresh the sorted array to fix the index classname
            renderStoredArray(arr);
        });
    });

    //todo put add item into its own function
    // change box to array element
    $(".add_item").click(function () {
        let box;

        //prompt user for the number to add
        let boxToBeAdded = prompt("what number to do you want to add to your array");

        //create the new div that will enclose the new array item
        box = document.createElement("div");

        // add class name based on the current length of the array
        box.className = `box box-${arr.length}`;

        // change the contents of the new div to the number given by the user
        box.innerHTML = boxToBeAdded;

        // add div to container
        $(".display2").append(box);

        // add the new element to the storage array
        // arr.append(parseInt(boxToBeAdded));


    });
});
