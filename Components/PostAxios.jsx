import React, { Component } from 'react';

class PostAxios extends Component {

    render() {

      const { posts, goToPage } = this.props;

      return (
          <div>
              <h2>Posts using Axios (From 'crypco.com'):</h2>
              <div className="post_row">{
                posts.map((post, index) => {
                  return (
                    <div className="post-item" key={post.id}>
                    <span>{index+1}. <a href={post.link} target="_blank">{post.title.rendered}</a></span>
                    </div>
                  );
                })
              }
              </div>
              <button type="button" onClick={() => goToPage('product-list')} >Back</button>
          </div>
      );

    }
}

export default PostAxios;
