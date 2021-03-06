import React from 'react';
import Loader from './Loader';
// Redux
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../../actions/getArticlesAction.js';

class Articles extends React.Component {

    componentDidMount() {
        this.props.getArticles();
    }

    renderArticles() {
        let articles = this.props.articles;
        if (articles != null) {
            return articles.map((article, index) => {
                let url = article.urlToImage ? article.urlToImage : "https://edge.alluremedia.com.au/m/l/2017/10/Star-Wars.jpg";
                if (index == 0) {
                    return (
                        <div className="carousel-item active" key={index}>
                            <img className="carousel-image" src={url} alt="..." />
                            <div className="carousel-caption">
                                <h3 className="caption-header">{article.title}</h3>
                                <p>
                                    {article.description}
                                    <a className="caption-url" href={article.url} target="_blank">Read More</a>
                                </p>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="carousel-item" key={index}>
                            <img className="carousel-image" src={url} alt="..." />
                            <div className="carousel-caption">
                                <h3 className="caption-header">{article.title}</h3>
                                <p>
                                    {article.description}
                                    <a className="caption-url" href={article.url} target="_blank">Read More</a>
                                </p>
                            </div>
                        </div>
                    )
                }
            })
        }
    }

    render() {
        return (
            <div id="articles">
                {
                    // If API returned articles then render carousel
                    this.props.articles != null
                        ? (
                            <div id="article-carousel" className="carousel slide" data-ride="carousel">
                                <ol className="carousel-indicators">
                                    <li data-target="#article-carousel" data-slide-to="0" className="active"></li>
                                    <li data-target="#article-carousel" data-slide-to="1"></li>
                                    <li data-target="#article-carousel" data-slide-to="2"></li>
                                    <li data-target="#article-carousel" data-slide-to="3"></li>
                                    <li data-target="#article-carousel" data-slide-to="4"></li>
                                    <li data-target="#article-carousel" data-slide-to="5"></li>
                                    <li data-target="#article-carousel" data-slide-to="6"></li>
                                    <li data-target="#article-carousel" data-slide-to="7"></li>
                                    <li data-target="#article-carousel" data-slide-to="8"></li>
                                    <li data-target="#article-carousel" data-slide-to="9"></li>
                                </ol>
                                <div className="carousel-inner">
                                    {this.renderArticles()}
                                </div>
                                <a className="carousel-control-prev" href="#article-carousel" role="button" data-slide="prev">
                                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Previous</span>
                                </a>
                                <a className="carousel-control-next" href="#article-carousel" role="button" data-slide="next">
                                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                    <span className="sr-only">Next</span>
                                </a>
                            </div>
                        )
                        // If API is loading articles or failed then show spinner loader
                        : <Loader />
                }
            </div>
        )
    }
}

function mapStateToProps(state) {
    return { articles: state.articles }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getArticles: getArticles }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(Articles);