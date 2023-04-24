library(jsonlite)
library(rematch)
library(magrittr)
# 加载必要包

cpath <- "D:\\Projects\\Web\\GithubPages\\celefor\\pages\\blogs\\"
json <- fromJSON(paste(cpath, "data.json", sep = "", collapse = ""))
# json读出的url不含有.html 故后面正则不要.html后缀
all_url <- json$url

files <- list.files(path = cpath)
se_files <- na.omit(re_match(pattern = ".+(?=.html)",text = files))
# 加载筛选筛选本地文件数据

if (length(all_url) == length(se_files)) {
  # quit(save = "no")
} else {
  cmp <- match(se_files, all_url)
  diff <- match(se_files, all_url) %>% is.na() %>% which()
  se_files[diff]
}


