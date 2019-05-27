// Create helper functions

function E(selector, parent)
{
    return (parent || document).querySelectorAll(selector);
}

function create(name, options)
{
    let elem = document.createElement(name);
    
    if(options)
    {
        for(var i in options)
        {
            if(i == "attributes")
                continue;
            
            elem[i] = options[i];
        }
        
        if(options.attributes)
        {
            for(var i in attributes)
            {
                elem.setAttribute(i, attributes[i]);
            }
        }
    }
    
    return elem;
}

// Initialize constants, element references

const DOC = document, WIDTH = window.innerWidth;

const header = E(".header")[0];
const toc = E(".table-of-contents")[0];

// Populate table of contents

function populateTableOfContents()
{
    let sections = E(".section");
        
    let createSectionLink = (section, isSub) => {
        let displayName = section.firstElementChild.innerText;
        
        return create("div", {
            className: `section-link ${isSub ? "sub-section-link" : ""}`,
            innerHTML: `<a href="#${section.id}" class="section-link-text">${displayName}</a>`
        });
    };
    
    sections.forEach((section) => {                
        let s_link = createSectionLink(section);
                
        toc.appendChild(s_link);
        
        let subSections = E(".sub-section", section);
        
        subSections.forEach((sub) => {
           toc.appendChild(createSectionLink(sub, true)); 
        });
    });;
}

function stickyTableOfContents()
{    
    let cl = toc.classList, scroll = window.scrollY || window.pageYOffset;
    
    cl.toggle("sticky", scroll > header.offsetHeight);
}

// Create event listeners

addEventListener("load", populateTableOfContents);

addEventListener("scroll", stickyTableOfContents);
