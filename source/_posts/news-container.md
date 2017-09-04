---
title: 细数你不得不知的容器安全工具
date: 2017-08-23 18:38:40
tags: 安全 工具 镜像 docker 引擎
categories: 研发工具
---
网络安全问题的重要性大概毋庸置疑，最近无数关于恶意软件和安全漏洞的消息已充分证明了这一点。

假如你要管理一个Docker环境，并希望帮助自己的公司或用户在下一个大漏洞来临时避免遇到麻烦，那么你就需要了解一些保障Docker应用安全的工具，并真正地去使用它们。本文将介绍可供使用的Docker安全工具（包括了来自Docker原生的安全工具以及第三方安全工具）。

## Docker Benchmark for Security

你首先需要了解的Docker安全工具之一就是Docker Benchmark for Security。Docker Benchmark for Security是一个简单的脚本，它可以测试并确保你的Docker部署遵守已有的的安全最佳实践（security best practices）。

Docker Benchmark for Security能够如此实用的原因之一是，它所参照的最佳实践基于的是各领域、各职位的行业专家所达成的共识。咨询人员、软件开发人员以及安全和执行方面的专家针对最佳实践的建立都贡献过宝贵观点及经验。你可以在Center for Internet Security（互联网安全中心）找到关于最佳实践和其背后原因的完整描述

## CoreOS Clair

CoreOS Clair是专门为Docker容器设计的漏洞扫描引擎。这个基于API的扫描引擎可以查看每个容器层，搜索并报告已知的漏洞。

CoreOS Clair有两个主要的使用场景。首先，针对那些并非由你亲自创建的镜像，Clair可以做充分的检查。例如，如果你从互联网下载镜像，镜像的安全性就很难保证。CoreOS Clair可以帮助你做出判断。它的第二个使用场景是，当你正在使用的不安全软件时，CoreOS Clair可以阻止和／或提醒你。

## Docker Security Scanning

Docker Security Scanning是另一个可为Docker进行安全漏洞扫描的工具。而且，它不仅仅是一个单纯的扫描引擎，以下几点同样值得注意：

首先，Docker Security不局限于扫描Docker容器，该工具还会检查Docker安装安全问题。此外，它能够扫描本地和远程两部分的安装。

另一个值得一看的一点是，Docker Security基于插件使用。这些插件使得Docker

## Drydock

Drydock的设计功能类似于Docker Benchmark for Security，不过在使用上更加灵活。和Docker Benchmark相似，Drydock是Docker的安全审核工具。而Drydock的独特之处在于，Drydock允许它的用户创建自定义的审核配置文件。这些配置文件可消除生成报告（噪声警报）中那些引起大量杂乱的审核，从而调整审核过程。此外它还可用于停用和环境无关、会产生虚假警报的审核测试。

和其他容器安全工具不同，使用Drydock创建自定义配置文件非常容易。该工具有一个内置的配置文件，包含了所有将要执行的审核测试，通过添加注释你就可以控制需要执行的检查。

你可以在Github上下载到Drydock

## Twistlock
Twistlock是Docker的另一个安全审核工具。和其他解决方案不同的是它是一种商业应用，提供了一个免费的开发版和一个有许可的企业版。

Twistlock扫描容器栈中的每一个单独层，并能够使用内容指纹技术识别各种组件以及可能与这些组件相关联的漏洞。

Twistlock企业版使用了机器学习来帮助识别漏洞，此外还提供了自动化策略创建和执行功能。免费的开发者版本和企业版有很多相似之处，但开发者版需要手动创建策略，依赖于社区的支持，而它也限制了只有10个仓库和两台主机。

## 总结
Docker在逐渐发展成熟，也被越来越多的企业投入使用，因此，确保Docker环境的安全也变得越来越重要。所幸的是，现有的一系列工具——包括免费版和商业版，都可以帮助你更好地维护Docker应用（如Deepfence、NeuVector和Anchore）的安全。
