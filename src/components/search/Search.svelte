<script lang="ts">
  import Input from "./InputFields/Input.svelte";

  enum MatchType {
    TITLE = 'title',
    HEADER = 'header',
    CONTENT = 'content'
  }

  type SearchMatch = {
    type: MatchType;
    match: string;
    link: string;
  }

  type SearchResult = {
    match: SearchMatch[];
    title: string;
    link: string;
  }

  type SearchContent = {
    "title": string;
    "description": string;
    "link": string;
    "headers": {
      depth: number;
      slug: string;
      text: string;
    }[];
    "content": string;
  }

  export let filePath: string;

  let searchInput: string = '';
  let content: SearchContent[] = [];
  let loading: boolean = false;

  // initialise: read file
  const initialiseContent =(file: string) => {
    loading = true;
    fetch(file).then(res => res.json()).then(json => {
      content = json;
      loading = false;
    }).catch(err => {
      console.log(err)
    })
  }

  initialiseContent(filePath)


  const searchContent = (input: string): SearchResult[] => {
    const regex = new RegExp(`\\w{0,}[\\s\\-\\.\`]{0,3}${input}[\\s\\-\\.\`]{0,3}\\w{0,}`, 'gmi');
    return content.map(item => {
      const matchesInHeaders = item.headers.map(headerItem => {
        const match = headerItem.text.match(regex);
         if (match) {
           return {
              type: MatchType.HEADER,
              match: match[0],
              link: `${item.link}#${headerItem.slug}`
           }
         }
      })

      const matchInTitle = item.title.match(regex);

      const titleMatch = matchInTitle ? {
        type: MatchType.TITLE,
        match: matchInTitle[0],
        link: item.link
      } : null;
      
      const matchesInContent = item.content.matchAll(regex);

      const contentMatches = Array.from(matchesInContent).map(match => {
        return {
          type: MatchType.CONTENT,
          match: match[0],
          link: item.link
        }
      });

      if (titleMatch || matchesInHeaders.length || contentMatches.length) {
        return {
          match: [...matchesInHeaders, titleMatch, ...contentMatches].filter(item => item),
          title: item.title,
          link: item.link
        }
      }
  }).filter(item => item?.match?.length)
}

  let searchResults: SearchResult[] = undefined;

</script>

{#if content.length === 0}
  <p>Initialising...</p>
{:else}
<div class="stack -layout-xl">
  <form class="stack -layout-m">
  <Input
    name="search"
    label="Search"
    id="search"
    type="search"
    autocomplete="off"
    bind:value={searchInput}
  />
  <button
    class="CTA-button"
    style="max-width: max-content;"
    type="submit"
    on:click={(e) => {
      e.preventDefault();
      searchResults = searchContent(searchInput);
    }}>Search</button
  >
  </form>
  {#if !searchResults}
  Start searching!
  {:else}
  {#if searchResults?.length === 0}
  <p>Nothing matches your search...</p>
  {:else}
  <ul class="list-reset stack -layout-xl w-full">
    {#each searchResults as result}
      <li class="stack -layout-m"><a href={result.link}>
        <h2 class="typo-l -bold font-headline">Page: {result.title}</h2>
        </a>
        <ul class="stack -layout-m list-reset">
          {#each result.match as match}
            <li>
              {#if match.type === MatchType.TITLE}
              <p class="jshsj-tag">Title matches</p>
              {:else if match.type === MatchType.HEADER}
              <a href="{match.link}" class="-bold"><strong>Chapter:</strong> {match.match}</a>
              {:else if match.type === MatchType.CONTENT}
              <p class="typo-s">...{match.match}...</p>
              {/if}
            </li>
          {/each}
        </ul>
      </li>
    {/each}
  </ul>
  {/if}
  {/if}
  </div>
{/if}
