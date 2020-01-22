import React, { useContext } from "react";
import MusicItem from "./musicItem.js"
import MusicListContext from "./musiclistContext";
function MusicList() {
    let data = useContext(MusicListContext);
    // console.log(data)
    return (
        <div>
            <h1 className="title">百度音乐榜单</h1>
            {data.map((item) =>
                <MusicItem key={item.id}  />
            )}
        </div>
    )
}
export default MusicList;