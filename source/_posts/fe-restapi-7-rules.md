---
title: 7 Rules for REST API URI Design
date: 2017-08-18 19:50:42
tags: REST API
categories: 前端
cover: cover.jpg
author:
    nick: Guy Levin
    link: https://blog.restcase.com/7-rules-for-rest-api-uri-design/
subtitle: Before going over the rules for REST API URI design, let’s do a quick overview on some of the terms we are going to talk about.
---
Before going over the rules for REST API URI design, let’s do a quick overview on some of the terms we are going to talk about.

## URIs

REST APIs use Uniform Resource Identifiers (URIs) to address resources. On today’s web, URI designs range from masterpieces that clearly communicate the API’s resource model like:

http://api.example.com/louvre/leonardo-da-vinci/mona-lisa
to those that are much harder for people to understand, such as:
http://api.example.com/68dd0-a9d3-11e0-9f1c-0800200c9a66

Tim Berners-Lee included a note about the opacity of URIs in his “Axioms of Web Architecture” list:

> The only thing you can use an identifier for is to refer to an object. When you are not dereferencing, you should not look at the contents of the URI string to gain other information.
> \- Tim Berners-Lee

Clients must follow the linking paradigm of the Web and treat URIs as opaque identifiers.

REST API designers should create URIs that convey a REST API’s resource model to its potential client developers. In this post, I will try to introduce a set of design rules for REST API URIs.

Prior diving to the rules, a word about the URI Format as the rules presented in this section pertain to the format of a URI.
RFC 3986 defines the generic URI syntax as shown below:

**URI = scheme "://" authority "/" path [ "?" query ] [ "#" fragment ]**

## Rule #1: A trailing forward slash (/) should not be included in URIs

This is one the most important rules to follow as the last character within a URI’s path, a forward slash (/) adds no semantic value and may cause confusion. REST API’s should not expect a trailing slash and should not include them in the links that they provide to clients.

Many web components and frameworks will treat the following two URIs equally:
http://api.canvas.com/shapes/ 
http://api.canvas.com/shapes

#### However, every character within a URI counts toward a resource’s unique identity.

Two different URIs map to two different resources. If the URIs differ, then so do the resources, and vice versa. Therefore, a REST API must generate and communicate clean URIs and should be intolerant of any client’s attempts to identify a resource imprecisely.

More forgiving APIs may redirect clients to URIs without a trailing forward slash (they may also return the 301 – “Moved Permanently” that is used to relocate resources”).

## Rule #2: Forward slash separator (/) must be used to indicate a hierarchical relationship

The forward slash (/) character is used in the path portion of the URI to indicate a hierarchical relationship between resources.

For example:
http://api.canvas.com/shapes/polygons/quadrilaterals/squares

## Rule #3: Hyphens (-) should be used to improve the readability of URIs

To make your URIs easy for people to scan and interpret, use the hyphen (-) character to improve the readability of names in long path segments. Anywhere you would use a space or hyphen in English, you should use a hyphen in a URI.

For example:
http://api.example.com/blogs/guy-levin/posts/this-is-my-first-post

## Rule #4: Underscores (_) should not be used in URIs

Text viewer applications (browsers, editors, etc.) often underline URIs to provide a visual cue that they are clickable. Depending on the application’s font, the underscore (_) character can either get partially obscured or completely hidden by this underlining.

To avoid this confusion, use hyphens (-) instead of underscores

## Rule #5: Lowercase letters should be preferred in URI paths

When convenient, lowercase letters are preferred in URI paths since capital letters can sometimes cause problems. RFC 3986 defines URIs as case-sensitive except for the scheme and host components.

For example:
http://api.example.com/my-folder/my-doc

HTTP://API.EXAMPLE.COM/my-folder/my-doc 
This URI is fine. The URI format specification (RFC 3986) considers this URI to be identical to URI #1.

http://api.example.com/My-Folder/my-doc 
This URI is not the same as URIs 1 and 2, which may cause unnecessary confusion.

## Rule #6: File extensions should not be included in URIs

On the Web, the period (.) character is commonly used to separate the file name and extension portions of a URI. 
A REST API should not include artificial file extensions in URIs to indicate the format of a message’s entity body. Instead, they should rely on the media type, as communicated through the Content-Type header, to determine how to process the body’s content.

http://api.college.com/students/3248234/courses/2005/fall.json 
http://api.college.com/students/3248234/courses/2005/fall

File extensions should not be used to indicate format preference.

REST API clients should be encouraged to utilize HTTP’s provided format selection mechanism, the Accept request header.

To enable simple links and easy debugging, a REST API may support media type selection via a query parameter.

## Rule #7: Should the endpoint name be singular or plural?

The keep-it-simple rule applies here. Although your inner-grammatician will tell you it's wrong to describe a single instance of a resource using a plural, the pragmatic answer is to keep the URI format consistent and always use a plural.

Not having to deal with odd pluralization (person/people, goose/geese) makes the life of the API consumer better and is easier for the API provider to implement (as most modern frameworks will natively handle /students and /students/3248234 under a common controller).

But how do you deal with relations? If a relation can only exist within another resource, RESTful principles provide useful guidance. Let's look at this with an example. A student has a number of courses. These courses are logically mapped to the /students endpoint as follows:

http://api.college.com/students/3248234/courses - Retrieves a list of all courses that are learned by a student with id 3248234. 
http://api.college.com/students/3248234/courses/physics - Retrieves course physics for a student with id 3248234.

## Conclusion

When you are designing REST API services, you have to pay attention to resources, those are defined by URIs.

Each resource in a service or services you are building will have at least one URI identifying it. It's best when that URI makes sense and adequately describes the resource. URIs should follow a predictable, hierarchical structure to enhance understandability and, therefore, usability: predictable in the sense that they're consistent, hierarchical in the sense that data has structure—relationships.

RESTful APIs are written for consumers. The name and structure of URIs should convey meaning to those consumers. By following the above rules, you will create a much cleaner REST APIs with a much happier client. This is not a REST rule or constraint, but it enhances the API.

I also suggest that you will take a look at http://blog.restcase.com/5-basic-rest-api-design-guidelines/

Design for your clients, not for your data.
