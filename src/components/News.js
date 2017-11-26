import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { getArticles } from '../actions/getArticlesAction.js';

class News extends React.Component {

    componentDidMount() {
        this.props.getArticles();
    }

    renderArticles() {
        let articles = this.props.articles;
        if (articles != null) {
            return articles.map((article, index) => {
                let url = article.multimedia.length > 0 ? "https://cdn1.nyt.com/" + article.multimedia[0].url : "https://cdn.movieweb.com/img.albums/FRgAKNrSBIT2km_8_600/Star-Wars.jpg";
                if (index == 0) {
                    return (
                        <div className="carousel-item active">
                            <img src={url} alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h3>{article.headline.main}</h3>
                                <p>...</p>
                            </div>
                        </div>
                    )
                } else {
                    return (
                        <div className="carousel-item">
                            <img src={url} alt="..." />
                            <div className="carousel-caption d-none d-md-block">
                                <h3>{article.headline.main}</h3>
                                <p>{article.snippet}</p>
                            </div>
                        </div>
                    )
                }
            })
        }
    }

    render() {
        return (
            <div id="carouselExampleIndicators" className="carousel slide" data-ride="carousel">
                <ol className="carousel-indicators">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="active"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="3"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="4"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="5"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="6"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="7"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="8"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="9"></li>
                </ol>
                <div className="carousel-inner">
                    {this.renderArticles()}
                </div>
                <a className="carousel-control-prev" href="#carouselExampleIndicators" role="button" data-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="sr-only">Previous</span>
                </a>
                <a className="carousel-control-next" href="#carouselExampleIndicators" role="button" data-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="sr-only">Next</span>
                </a>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        articles: state.articles
    }
}

function matchDispatchToProps(dispatch) {
    return bindActionCreators({ getArticles: getArticles }, dispatch)
}

export default connect(mapStateToProps, matchDispatchToProps)(News);