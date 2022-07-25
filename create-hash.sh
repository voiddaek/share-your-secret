#!/usr/bin/env sh

echo -e "hash were generated using:" >> /usr/share/nginx/html/hash.txt
echo -e "sha256sum <filepath>" >> /usr/share/nginx/html/hash.txt
echo -e "" >> /usr/share/nginx/html/hash.txt

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