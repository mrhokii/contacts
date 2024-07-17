import {PURPLE, CURRENTLINE} from "../helpers/color"
import React from "react"
const Search = ({query, search}) => {
    return (
        <React.Fragment>
            <div className="input-group mx-2 w-75" dir="ltr">
                <span className="input-group-text" style={{ backgroundColor: PURPLE }}>
                    <i className="fa fa-search"></i>
                </span>
                <input id="inp" dir="rtl" type="text"
                 value={query}
                 onChange={search}
                 style={{borderColor: CURRENTLINE}}
                 className="form-control"
                 placeholder="جستجوی مخاطب" />
            </div>
        </React.Fragment>
    )
}

export default Search
