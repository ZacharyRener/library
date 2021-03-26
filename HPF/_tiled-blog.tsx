/*

Example of rendering this component:

const blog = () => {

  ReactDOM.render(

    <Blog
      propQuery=""
      excludeCategories={[99]}
      excludeCatStr='&categories_exclude=99'
    />,
    document.getElementById("blogroot")

  )

}

*/

import React, { Component } from 'react'

interface AppProps {
    propQuery: string,
    excludeCategories: Array<any>,
    excludeCatStr: string,
}
interface AppState {
    posts: Array<any>,
    categories: Array<any>,
    newestPost: Array<any>,
    selectedCat: string,
    buttonText: string,
    postOffset: number,
    postsPerPage: number,
    categoryUrl: string,
    selectedClass: string,
    catDisabledClass: string,
    newestDisabledClass: string,
    extraQuery: string,
}

export default class Blog extends Component<AppProps, AppState>  {

    constructor(props: any) {

        super(props)
        this.state = {
            posts: [],
            categories: [],
            newestPost: [],
            selectedCat: '',
            buttonText: 'Content is loading...',
            postOffset: 0,
            postsPerPage: 9,
            categoryUrl: '',
            selectedClass: 'hide',
            catDisabledClass: 'disabled',
            newestDisabledClass: 'disabled',
            extraQuery: '',
        }
        // office fun: 150
        this.loadBlogPosts = this.loadBlogPosts.bind(this)
        this.loadCategories = this.loadCategories.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.handleCategoryClick = this.handleCategoryClick.bind(this)
        this.handleCategoryRemoval = this.handleCategoryRemoval.bind(this)
        this.loadNewestPost = this.loadNewestPost.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)

        this.loadNewestPost()
        this.loadBlogPosts()
        this.loadCategories()

    }

    loadBlogPosts() {

        const fetchUrl = `/wp-json/wp/v2/posts?per_page=${this.state.postsPerPage}&offset=${this.state.postOffset}&_embed${this.state.categoryUrl}${this.state.extraQuery}${this.props.excludeCatStr}${this.props.propQuery}`
        console.log(fetchUrl)

        fetch(fetchUrl)
            .then(response => response.json())
            .then(data => {
                this.setState({ posts: this.state.posts.concat(data) })
                this.setState({ buttonText: 'View More' })
                this.setState({ catDisabledClass: '' })
            })

    }

    loadCategories() {

        fetch('/wp-json/wp/v2/categories?per_page=100')
            .then(response => response.json())
            .then(data => {
                this.setState({ categories: this.state.categories.concat(data) })
                //console.log(this.state.categories[0].id)
            })

    }

    handleButtonClick(event: any) {

        event.preventDefault()
        this.setState({ buttonText: 'Content is loading...' })
        this.setState({ catDisabledClass: 'disabled' })
        this.setState({ postOffset: this.state.postOffset + this.state.postsPerPage }, () => {
            this.loadBlogPosts()
        })

    }

    handleCategoryClick(categoryId: number, categoryName: string) {

        if (this.state.catDisabledClass != 'disabled') {

            this.setState({ buttonText: 'Content is loading...' })
            this.setState({ catDisabledClass: 'disabled' })
            this.setState({ selectedCat: categoryName })
            this.setState({ selectedClass: 'show' })

            this.setState({ posts: [] }, () => {
                this.setState({ postOffset: 0 }, () => {
                    this.setState({ categoryUrl: `&categories=${categoryId}` }, () => {
                        this.loadBlogPosts()
                    })
                })
            })

        }

    }

    handleCategoryRemoval() {

        this.setState({ buttonText: 'Content is loading...' })
        this.setState({ catDisabledClass: 'disabled' })
        this.setState({ selectedClass: 'hide' })

        this.setState({ selectedCat: '' }, () => {
            this.setState({ categoryUrl: '' }, () => {
                this.setState({ postOffset: 0 }, () => {
                    this.setState({ posts: [] }, () => {
                        this.loadBlogPosts()
                    })
                })
            })
        })

    }

    loadNewestPost() {

        fetch(`/wp-json/wp/v2/posts?per_page=1&_embed${this.props.excludeCatStr}${this.props.propQuery}`)
            .then(response => response.json())
            .then(data => {

                this.setState({ newestPost: data })
                this.setState({ newestDisabledClass: '' })

            })

    }

    handleSubmit(event: any) {
        event.preventDefault()
        let form: any = document.querySelector('.sidebar #s')
        let value: any = form.value;
        let query: string = '&search=' + value

        this.setState({ buttonText: 'Content is loading...' })
        this.setState({ catDisabledClass: 'disabled' })
        this.setState({ selectedCat: value })
        this.setState({ selectedClass: 'show' })

        this.setState({ posts: [] }, () => {
            this.setState({ extraQuery: query }, () => {
                this.loadBlogPosts()
                this.setState({ extraQuery: '' })
            })
        })


    }

    render() {

        return (

            <section id="blogPage">

                <div className='sidebar col-md-3'>

                    <section id='sidebar'><nav className='navigation'><p className='menu-title'>About Us</p> <ul><li><a href='/about-us/our-team'>Our Team</a></li><li><a href='/resources/case-studies/'>Case Studies</a></li></ul></nav> <section id='offer'><p className='title'></p> <a href=''><img alt='offer' /></a> <div className='offer-container'><p className='headline'></p> <p></p> <div className='btn-container'><a className='btn' href=''></a></div></div></section></section>

                    <form method="get" id="searchform" onSubmit={this.handleSubmit}>
                        <input placeholder="Search the blog" className="form-control" type="text" name="s" id="s" />
                    </form>

                    <h2>Categories</h2>
                    <ul className="sidebar-links">
                        {this.state.categories.map((category, id) => {
                            console.log(category.name)
                            if (!this.props.excludeCategories.includes(category.id)) {
                                return (
                                    <li className={this.state.catDisabledClass + " cat-item"} key={id} >
                                        <a onClick={() => this.handleCategoryClick(category.id, category.name)}
                                            dangerouslySetInnerHTML={{ __html: category.name }} />
                                    </li>
                                )
                            } else {
                                return (<span></span>);
                            }

                        })}
                    </ul>

                </div>

                <div className="blogs col-md-8 pull-right">

                    <div className={this.state.newestDisabledClass + ' featured row'}>
                        <div className={this.state.newestDisabledClass + ' col-md-12'}>Newest Blog Post</div>
                        <div className='col-md-4 image'>
                            {this.state.newestPost.map((post, id) => {

                                const hasMedia: boolean = post._embedded.hasOwnProperty("wp:featuredmedia")
                                const hasImage: boolean = hasMedia
                                    ? post._embedded["wp:featuredmedia"][0].hasOwnProperty("source_url")
                                    : false;
                                return hasMedia && hasImage
                                    ? (<a href={post.link}><img key={id} src={post._embedded["wp:featuredmedia"][0].source_url}></img></a>)
                                    : (<a href={post.link}><div key={id} className="imageSpacer" /></a>);

                            })}
                        </div>
                        <div className='col-md-8 content'>
                            {this.state.newestPost.map((post, id) => {

                                const theDate = new Date(post.date).toISOString().slice(0, 10);

                                return (
                                    <span key={id}>
                                        <h2>{post.title.rendered}</h2>
                                        <div className="date">{theDate}</div>
                                        <div className='btnWrapper'>
                                            <a href={post.link} className="btn btn-default btn-orange">
                                                Read More
                                            </a>
                                        </div>
                                    </span>
                                )

                            })}
                        </div>
                    </div>

                    <section id="selectedCats" className={this.state.selectedClass}>
                        <span onClick={this.handleCategoryRemoval} ><span dangerouslySetInnerHTML={{ __html: this.state.selectedCat }}></span><i className="fa fa-times"></i></span>
                    </section>

                    {this.state.posts.map((post, id) => {

                        const excerpt = (): string => {

                            let smallExcerpt: string = '<p>';
                            let excerptArr = post.excerpt.rendered.split(' ');
                            for (let i = 0; i < excerptArr.length; i++) {
                                if (i < 11) {
                                    smallExcerpt += excerptArr[i] + ' ';
                                }
                            }

                            return smallExcerpt + '...</p>';

                        }

                        const image = () => {
                            const hasMedia: boolean = post._embedded.hasOwnProperty("wp:featuredmedia")
                            const hasImage: boolean = hasMedia
                                ? post._embedded["wp:featuredmedia"][0].hasOwnProperty("source_url")
                                : false;
                            return hasMedia && hasImage
                                ? (<a href={post.link}><img src={post._embedded["wp:featuredmedia"][0].source_url}></img></a>)
                                : (<a href={post.link}><div className="imageSpacer" /></a>);
                        }

                        const date = new Date(post.date).toISOString().slice(0, 10);

                        const authorName = post["_embedded"]["author"][0]["name"];
                        const authorLink = post.acf.author_link;

                        const theAuthorLink = authorLink == '' || authorLink == null ? authorName : (<a href={authorLink}>{authorName}</a>);

                        return (
                            <div className="col-md-4 post" key={id}>
                                {image()}
                                <a href={post.link} dangerouslySetInnerHTML={{ __html: post.title.rendered }}></a>
                                <div className="date">By {theAuthorLink} </div>
                                <div className="date">{date}</div>
                                <div className="excerpt"
                                    dangerouslySetInnerHTML={{ __html: excerpt() }} />
                            </div>
                        )
                    })}

                    <div className="row">
                        <div className='btnWrapper'>
                            <a onClick={this.handleButtonClick} className="btn btn-default btn-orange">{this.state.buttonText}</a>
                        </div>
                    </div>

                </div>


            </section>

        );
    }
}