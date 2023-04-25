library(jsonlite)
library(rematch)
library(magrittr)
library(rvest)
# 加载必要包

cpath <- "D:\\Projects\\Web\\GithubPages\\celefor\\pages\\blogs\\"
parts_path <- "D:\\Projects\\Web\\GithubPages\\celefor\\pages\\parts\\"
json <- fromJSON(paste(c(cpath, "data.json"), sep = "", collapse = ""))
# json读出的url不含有.html 故后面正则不要.html后缀
header <- paste(c(parts_path, "header.html"), sep = "", collapse = "") %>% readLines(encoding = "UTF-8")
footer <- paste(c(parts_path, "footer.html"), sep = "", collapse = "") %>% readLines(encoding = "UTF-8")


# 筛选blogs下文件名
files <- list.files(path = cpath)
se_files <- re_match(pattern = ".+(?=.html)", text = files) %>% na.omit()


all_url <- json$url
# json现有所有url  用于后续判断
if (length(all_url) == length(se_files)) {
  # quit(save = "no")
} else {
  cmp <- match(se_files, all_url)
  diff <- match(se_files, all_url) %>% is.na() %>% which()
  
  # 调制未调制文档
  for (cse_file in se_files[diff]) {
    c_text <- NULL
    c_url <- paste(c(cse_file, ".html"), sep = "", collapse = "")
    # 获得文章URL
    print(c_url)
    
    c_absolute_url <- paste(c(cpath, cse_file, ".html"), sep = "", collapse = "")
    c_html <- c_absolute_url %>% read_html(encoding = "UTF-8")
    title_node <- html_element(x = c_html, css = "h1")
    c_title <- title_node %>% html_text()
    # 获得文章标题
    
    key_node <- html_element(x = c_html, css = "keywords")
    c_keywords <- key_node %>% html_attr(name = "data")
    # 获得文章关键词
    
    c_date <- re_match(pattern = "\\d{4}-\\d{1,2}-\\d{1,2}", text = cse_file)
    # 获得文章日期
    
    # 需先调整整个列表的length才能调整其元素的length
    temp <- json
    length(json) <- 0
    json$title <- c(temp$title, c_title)
    json$url <- c(temp$url, cse_file)
    json$date <- c(temp$date, c_date)
    json$keywords <- c(temp$keywords, c_keywords)
    # JSON追加数据
    
    c_text <- readLines(c_absolute_url, encoding = "UTF-8")
    header[4] <- paste(c("<title>", c_title, "</title>"), sep = "", collapse = "")
    header[5] <- paste(c("<meta name='Keywords' content='", c_keywords, "'>"), sep = "", collapse = "")
    writeLines(c(header, c_text, footer), con = c_absolute_url, sep = "\n")
    # 根据当前参数调整header文档  合并  写入
    
    writeLines(toJSON(json, pretty = TRUE), con = paste(c(cpath, "data.json"), sep = "", collapse = ""), sep = "\n")
    }
}
