import React from 'react'

export default function Skeleton({ item }) {
  return (
    item === "working" ?
        <div id="skeleton">
            <div className="item-skeleton"></div>
            <div className="item-skeleton"></div>
            <div className="item-skeleton"></div>
            <div className="item-skeleton"></div>
        </div>

            :<div id="results-skeleton">
                <div className="skel-balls"></div>
                <div className="skel-balls"></div>
                <div className="skel-balls"></div>
                <div className="skel-balls"></div>
                <div className="skel-balls"></div>
                <div className="skel-balls"></div>
                <div className="skel-balls"></div>
            </div>
  )
}
