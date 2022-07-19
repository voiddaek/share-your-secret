#!/usr/bin/env sh

for f in /usr/share/nginx/html/*.*; 
do
    text=$(sha256sum $f)
    hash=$(echo "$text" | cut -d" " -f1)

    file=$(echo "$text" | rev)
    file=$(echo "$file" | cut -d"/" -f1)
    file=$(echo "$file" | rev)
    n=`printf "%-30s %s" $file $hash`
    echo -e "$n"
    echo -e "$n" >> /usr/share/nginx/html/hash.txt
done