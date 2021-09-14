import { LitElement, html, TemplateResult } from "lit-element"
import {customElement } from "lit/decorators"
import { people,IPerson } from "../people"

@customElement("people-app")
class PeopleAppElement extends LitElement {
    people = people
    
    onMakeFavourite(event:CustomEvent):void {
        console.log("make favourite", event.detail)
        // window.alert(`${(event.detail as IPerson).name} favorited`)
        this.dispatchEvent(new CustomEvent("makeFavourite", {detail:event.detail})) // Bubble the event event further up
    }

    render():TemplateResult {
        return html`
            <h1>List of people</h1>

            ${this.people.map(person => html`
                <person-card .person=${person} @makeFavourite=${this.onMakeFavourite}></person-card>
            `)}
        `
    }
}
declare global { interface HTMLElementTagNameMap { "people-app": PeopleAppElement}}