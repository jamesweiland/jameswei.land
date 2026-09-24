---
title: My Home Server
description: I host several services on a Raspberry Pi in my basement, including this website. Some of them are for my home network, and others are public-facing.
isFeatured: true
---
I use my Raspberry Pi as a home server to host mostly third-party applications, but also some apps I've written myself. My goal for this project was to keep services as containerized as possible, which I've managed to achieve (with the exception of Nginx running on the host). I also run Docker in rootless mode for extra security. At the time of writing this, the actual services I run are:
- [pihole](https://pi-hole.net), a DNS cache with a blocklist of ad domains
- [unbound](https://www.nlnetlabs.nl/projects/unbound/about/), a local DNS resolver
- a [wireguard](https://www.wireguard.com/) peer that acts as a "hub" for my peers to talk to each other and access my services even when I'm not on the LAN
- a [Tor WebTunnel bridge](https://community.torproject.org/relay/setup/webtunnel/). The bridge allows clients to disguise Tor traffic as regular HTTPS traffic, so people living in authoritarian countries can sneak past firewalls blocking Tor
- A CRON job that runs a script I use for work. It checks my GitLab MRs for any new comments, then pings a private Slack channel with the comment. I didn't like having to check my email 
- This website!

Setting up pihole, unbound, and wireguard in containers was not as straightforward as I would've liked it to be; I've got a separate [post](/posts/pihole-unbound-wireguard) explaining how to set those up so they can interact together. Check it out if you're interested in replicating the setup for yourself.

I consider this an "ongoing project" as there are a few more services I'd like to add. At the moment, the most pressing is some containerized "checkhealth" daemon that alerts my phone for unhealthy containers. I've learned that people you live with get really annoyed when the wifi goes down!

You can see the actual Docker compose configuration [here](TODO).
