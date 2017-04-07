import React from 'react';
import StatusUpdate from './statusupdate';
import CommentThread from './commentthread';
import Comment from './comment';

export default class FeedItem extends React.Component {
  constructor(props) {
    super(props);
    // The FeedItem's initial state is what the Feed passed to us.
    this.state = props.data;
  }

  handleCommentPost(commentText) {
    // Post a comment as user ID 4, which is our mock user!
    postComment(this.state._id, 4, commentText, (updatedFeedItem) => {
      // Update our state to trigger a re-render.
      this.setState(updatedFeedItem);
    });
  }
  /**
    * Triggered when the user clicks on the 'like' or 'unlike' button.
    */
   handleLikeClick(clickEvent) {
     // Stop the event from propagating up the DOM tree, since we handle it here.
     // Also prevents the link click from causing the page to scroll to the top.
     clickEvent.preventDefault();
     // 0 represents the 'main mouse button' -- typically a left click
     // https://developer.mozilla.org/en-US/docs/Web/API/MouseEvent/button
     if (clickEvent.button === 0) {
       // Callback function for both the like and unlike cases.
       var callbackFunction = (updatedLikeCounter) => {
         // setState will overwrite the 'likeCounter' field on the current
         // state, and will keep the other fields in-tact.
         // This is called a shallow merge:
         // https://facebook.github.io/react/docs/component-api.html#setstate
         this.setState({likeCounter: updatedLikeCounter});
       };

       if (this.didUserLike()) {
         // User clicked 'unlike' button.
         unlikeFeedItem(this.state._id, 4, callbackFunction);
       } else {
         // User clicked 'like' button.
         likeFeedItem(this.state._id, 4, callbackFunction);
       }
     }
   }

   /**
    * Returns 'true' if the user liked the item.
    * Returns 'false' if the user has not liked the item.
    */
   didUserLike() {
     var likeCounter = this.state.likeCounter;
     var liked = false;
     // Look for a likeCounter entry with userId 4 -- which is the
     // current user.
     for (var i = 0; i < likeCounter.length; i++) {
       if (likeCounter[i]._id === 4) {
         liked = true;
         break;
       }
     }
     return liked;
   }
}
   render() {
     var likeButtonText = "Like";
     if (this.didUserLike()) {
       likeButtonText = "Unlike";
     }
     // Skipping the first part of this method, which is unchanged.
                 <a href="#" onClick={(e) => this.handleLikeClick(e)}>
                   <span className="glyphicon glyphicon-thumbs-up"></span> {likeButtonText}
                 </a>
     // The rest of this method is unchanged
   }
