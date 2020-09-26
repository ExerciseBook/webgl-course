/*
 * This file is part of Dreamer-Paul/Kico-Style and Modified by Eric_Lian
 *
 * The MIT License (MIT)
 *
 * Copyright (c) 2020 contributors
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

function KicoNetwork_() {
    
    this.Ajax  = function (prop) {

        if(!prop.url) prop.url = document.location.href;
        if(!prop.method) prop.method = "GET";
        let data = "";

        // 解析 data
        if(prop.method === "POST" || prop.method === "PATCH" || prop.method === "DELETE" || prop.method === "PUT") {
            if (typeof(prop.rawData) != 'undefined') {
                data = prop.data;
            }
                else
            {
                data = JSON.stringify(prop.data);
            }
        }
        else if(prop.method === "GET") {
            var url = prop.url + "?";

            for(var d in prop.data){
                url += d + "=" + prop.data[d] + "&";
            }

            prop.url = url.substr(0, url.length - 1);
        } else throw new Error('Method Not Allow');

        var request = new XMLHttpRequest();
        request.open(prop.method, prop.url);
        if (prop.crossDomain) {
            request.setRequestHeader("X-Requested-With", "XMLHttpRequest");
        }

        // 是否需要添加 JSON 头
        if (prop.method === "POST" || prop.method === "PATCH" || prop.method === "DELETE" || prop.method === "PUT") {
            if (typeof(prop.rawData) == 'undefined') {
                request.setRequestHeader('Content-Type', 'application/json; charset=utf-8');
            }
        }

        if(prop.header){
            for(var i in prop.header){
                request.setRequestHeader(prop.header[i][0], prop.header[i][1]);
            }
        }

        request.send(data);

        request.onreadystatechange = function () {
            if(request.readyState === 4){

                if(request.status === 200 || request.status === 304){

                    let tmp = request.responseText;
                    let data = null;
                    try {
                        data = JSON.parse(tmp);
                    } catch (e) {
                        data = tmp;
                    }
                    
                    prop.success ? prop.success(request, data) : console.log(prop.method + " 请求发送成功");


                }
                else{

                    prop.failed ? prop.failed(request) : console.log(prop.method + " 请求发送失败");

                }

                request = null;
            }
        };

        return request;

    };

    return this;

}


KicoNetwork = KicoNetwork_();