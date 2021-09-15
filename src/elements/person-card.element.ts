import { LitElement, html,css,TemplateResult } from "lit"
import { customElement, query, property } from "lit/decorators.js"

import { IPerson } from "../people"

@customElement("person-card")
class PersonCardElement extends LitElement {

    static styles = [css`
    :host {
        display:block;
        clear:both;
        margin-bottom:10px;
    }
    h5 {
        font-size:1.3rem;
        margin-bottom:0;
    }
    #img {
        width:50px;
        height:50px;
        border-radius:50%;
        margin-right:10px;
        background-size:cover;
        background-image:var(--image-url);
        background-color:var(--color, #ccc);
        float:left;
        overflow:hidden;
    }
`]

    @property({type:Object})
    person!: IPerson

    @query("#img")
    image!:HTMLElement
    // The TS Loader may not know the keyword override
    firstUpdated():void {
        this.image?.style.setProperty("--image-url",`url(${this.person.image})`)
    }

    makeFavourite():void {
        const event = new CustomEvent("makeFavourite", {detail:this.person})
        this.dispatchEvent(event)
    }
    // override
    render():TemplateResult {
        return html`
            <div id="img" alt=${this.person.name}></div>
            <h5>${this.person.name}</h5>
            ${this.person.title ? html`${this.person.title}<br>`: ""}
            <a href="mailto:${this.person.email}">${this.person.email}</a>
            <button @click=${this.makeFavourite}>Make Favourite</button>
        `
    }
}
declare global { interface HTMLElementTagNameMap { "person-card": PersonCardElement}}
