const { Component } = require('inferno');
const gravatrHelper = require('hexo-util').gravatar;
const { cacheComponent } = require('../util/cache');
const  diaries  = require('../mockData/diaries')
const  weathers  = require('../mockData/weathers')

class Profile extends Component {
    renderSocialLinks(links) {
        if (!links.length) {
            return null;
        }
        return <div class="level is-mobile">
            {links.filter(link => typeof link === 'object').map(link => {
                return <a class="level-item button is-transparent is-white is-marginless"
                    target="_blank" rel="noopener" title={link.name} href={link.url}>
                    {'icon' in link ? <i class={link.icon}></i> : link.name}
                </a>;
            })}
        </div>;
    }

    render() {
        const {
            avatar,
            avatarRounded,
            author,
            authorTitle,
            location,
            counter,
            followLink,
            followTitle,
            socialLinks
        } = this.props;

        const hitokotoJs = `
                                // 获取舔狗日记
                                const randomTianDogData = function (list) {
                                    // 随机取出一个元素
                                    const randomIndex = Math.floor(Math.random() * list.length); // 生成 0 到 list.length-1 之间的整数
                                    return list[randomIndex]; // 根据随机下标获取数组中的元素
                                }
                                // 获取年月日
                                const randomTianDogDate = function () {
                                    // 获取 1970 年 1 月 1 日至今的毫秒数范围
                                    const minTimestamp = new Date('2020-01-01').getTime();
                                    const maxTimestamp = new Date().getTime();
                        
                                    // 生成指定范围内的随机日期
                                    const randomTimestamp = Math.floor(Math.random() * (maxTimestamp - minTimestamp)) + minTimestamp;
                                    const randomDate = new Date(randomTimestamp);
                        
                                    // 获取随机日期的年、月、日
                                    const year = randomDate.getFullYear();
                                    const month = randomDate.getMonth() + 1;
                                    const day = randomDate.getDate();
                        
                                    return year + '-' + month + '-' + day // 输出随机的年月日
                                }

                                function getYiyan(){
                                    $.when(
                                      $.getJSON('http://111.230.213.88/mockData/weathers.json'),
                                      $.getJSON('http://111.230.213.88/mockData/diaries.json')
                                    ).done(function(data1, data2) {
                                      // 在这里对两个接口的数据进行操作
                                      $('#hitokoto').html("");
                                      $('#hitokoto').append(
                                        "<p>" + randomTianDogDate() + "</p><p>" + randomTianDogData(data1[0]) + "</p>" +
                                        "<strong style='color: #3273dc;'>" + randomTianDogData(data2[0]) + "</strong>"
                                      );  
                                    }).fail(function() {
                                      console.log('Error: 舔狗日记获取失败.');
                                    });
                                }
                                $(function (){getYiyan();$('#hitokoto').click(function(){getYiyan();})});`;


        return <div class="card widget">
            <div class="card-content">
                <nav class="level">
                    <div class="level-item has-text-centered flex-shrink-1">
                        <div>
                            <figure class="image is-128x128 mx-auto mb-2">
                                <img class={avatarRounded ? 'is-rounded' : ''} src={avatar} alt={author} />
                            </figure>
                            {author ? <p class="title is-size-4 is-block line-height-inherit">{author}</p> : null}
                            {authorTitle ? <p class="is-size-6 is-block">{authorTitle}</p> : null}
                            {location ? <p class="is-size-6 is-flex justify-content-center">
                                <i class="fas fa-map-marker-alt mr-1"></i>
                                <span>{location}</span>
                            </p> : null}
                        </div>
                    </div>
                </nav>
                <nav class="level is-mobile">
                    <div class="level-item has-text-centered is-marginless">
                        <div>
                            <p class="heading">{counter.post.title}</p>
                            <a href={counter.post.url}>
                                <p class="title">{counter.post.count}</p>
                            </a>
                        </div>
                    </div>
                    <div class="level-item has-text-centered is-marginless">
                        <div>
                            <p class="heading">{counter.category.title}</p>
                            <a href={counter.category.url}>
                                <p class="title">{counter.category.count}</p>
                            </a>
                        </div>
                    </div>
                    <div class="level-item has-text-centered is-marginless">
                        <div>
                            <p class="heading">{counter.tag.title}</p>
                            <a href={counter.tag.url}>
                                <p class="title">{counter.tag.count}</p>
                            </a>
                        </div>
                    </div>
                </nav>
                {/* 关注我 */}
                {/* {followLink ? <div class="level">
                    <a class="level-item button is-primary is-rounded" href={followLink} target="_blank" rel="noopener">{followTitle}</a>
                </div> : null} */}
                {this.renderSocialLinks(socialLinks)}
                <hr />
                <p id="hitokoto">:D 舔狗日记获取中...</p>
                <script type="text/javascript" dangerouslySetInnerHTML={{ __html: hitokotoJs }} defer={true}></script>
            </div>
        </div>;
    }
}

module.exports = cacheComponent(Profile, 'widget.profile', props => {
    const { site, helper, widget } = props;
    const {
        avatar,
        gravatar,
        avatar_rounded = false,
        author = props.config.author,
        author_title,
        location,
        follow_link,
        social_links
    } = widget;
    const { url_for, _p, __ } = helper;

    function getAvatar() {
        if (gravatar) {
            return gravatrHelper(gravatar, 128);
        }
        if (avatar) {
            return url_for(avatar);
        }
        return url_for('/img/avatar.png');
    }

    const postCount = site.posts.length;
    const categoryCount = site.categories.filter(category => category.length).length;
    const tagCount = site.tags.filter(tag => tag.length).length;

    const socialLinks = Object.keys(social_links).map(name => {
        const link = social_links[name];
        if (typeof link === 'string') {
            return {
                name,
                url: url_for(link)
            };
        }
        return {
            name,
            url: url_for(link.url),
            icon: link.icon
        };
    });

    return {
        avatar: getAvatar(),
        avatarRounded: avatar_rounded,
        author,
        authorTitle: author_title,
        location,
        counter: {
            post: {
                count: postCount,
                title: _p('common.post', postCount),
                url: url_for('/archives')
            },
            category: {
                count: categoryCount,
                title: _p('common.category', categoryCount),
                url: url_for('/categories')
            },
            tag: {
                count: tagCount,
                title: _p('common.tag', tagCount),
                url: url_for('/tags')
            }
        },
        followLink: url_for(follow_link),
        followTitle: __('widget.follow'),
        socialLinks
    };
});
