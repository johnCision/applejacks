# Componentization


	"the process and language by which we break expressions of functionality into smaller, special purpose units and create stable agreed boundaries between them."


this process is applied to application (specificity with regard to rendering technologies
and input capabilities) from several perspectives:

- Building blocks of logical (data centric / developer centric) view of the expression of data into the HTML syntax

- Design isolation of the presentation and interpretation of that view based on a stable and expressive / open interface (all in HTML no JS state objects for components)

- Composition and limited / no dependencies in order to allow version neutral component integration.

- Application logic separation and concern isolation (a list object should not assume its data source url, but should assume that object once identified contains a shared api, such as a `prev` and `next` link i the http `Link` headers)

## Why?

as shown bellow, a functional, declarative approach, along with exposing state and css isolation, provide a foundation that attempts to address traditional failures of ui/ux systems:

 - styles can not change independent of component features
 - components beyond the basics are rarely portable or do not exist
 - compatibility is limited by the external dependencies of individual components


styling of components is a moving target, to assume there is a single style that is stable leads to design and technologies choices that make that assumption. thus, the process of updating, changes independent of component technical features, is key.  to keep pace with the refinement, but also the evolution of the design language will enable innovations within that space, and products

a wide range of ui "toolkit"s over the years have presented parts and pattern for the most basic components, both internal and external supported systems.  and while some have also presented higher level "reusable" components, they traditionally come with a heavy set of rule / environment / dependencies etc.   these limitation hamper the above design process, and add complexity when trying to create a unique company specific brand and style (personality / identity)

this has traditionally been difficult due to the lack of natural composition of DOM (HTML) elements.  and while some frameworks pioneered some of these techniques, they do not solve the core fundamentals of what to compose, but just how.

### ByoD

the separation of the application layer logic from the components used in that expression (in HTML) is key to providing components that truly can be reused.  by aligning on common api interfaces, and providing highly composable components, the normalization of components across a wide range of use cases cna be achieved.



## Examples

these processes are at the heart of the W3C web fundamentals. It is what has guided the development of HTML itself.

for example:

```html
	<img src="https://some.url/img.fmt>
```

while the image tag does not assume its `src`, once set (an events) the `img` element then know how to download and decode some file formats


also:

```html
	<input type="..." disabled>
```

we know that the input is disabled, not by evaluating its internal javascript state, but by the expression of the attribute `disabled` on the element itself.
this expression of the object state as attributes (using primitive types) is what allows CSS authors / designers / creators to build upon a open framework
and produce a wide verity of functionality


and:

```html
	<select>
		<option>A</options>
		<option selected>B</options>
	</select>
```

while componitization will not solve all complexities, examples solution can be found within the HTML native implementation.
the `select` element has a natural composition (and relationship) with the `option` elements.   that is, depending on
user interaction, the `select` will update the `selected` attribute as desired by the user.
this both shows the expression of state, the ability of CSS authors to then use that state to effect
rendering (visual and non-visual) and the interplay between complex components with the DOM.



## Dependency independence

the build process and developer lifecycle leads to assumption of technologies and integrations (in order to further optimization or development or deployment pain points).  by delaying composition until the final step - the application - the assumption of technologies is minimized.

by further minimizing cross-component dependencies, further flexibility is gained, as follows:

```html
	<!-- Wrong -->
	<not-a-cision-button icon="close" />


	<!-- Right -->
	<cision-button>
		<some-other-icon name="close" slot="icon" />
	</cision-button>
```

by further decomposing components, composition of existing, well written, stable components can be assemble to achieve a stable developer expression of the application, while allow abstraction and confidence of the CSS author to make additional changes.


lastly, the components themselves can be written free of polyfill technologies (react / vue / angular / etc) which allows it to co-exist within those environments, and also as standalone items themselves.

this is achieved two fold, by taking advantage of lower-level more expressive apis provided as part of the standard.  and secondly by adhering to core tenets that that design is built on.

which leads to a scalable, faster and more predictable api to work again.


## Application logic is for the application

by creating a pool of independently composable components free of application logic. those components then have a higher likelihood of being applicable in more situations.

further, but strongly separating application logic, and its state management, each individual part becomes more maintainable and easer to reason about in complex system.

separation of application logic how does not imply separation of common patterns.

as noted, a higher-level list component may have a concept of previous and next page as defined by a server driven list.  by exposing a common api for list representation (via json schema / url versioning / mimetype / etc) those components that support that api and expose those new capabilities to the user (via the ui presumably but not limited to)

```json
	{
		"list": [ "A", "B", "C", "D" ],
		"link": [
			{ "rel": "prev", "irn": "..." },
			{ "rel": "next", "irn": "..." }
		]
	}
```

```html

	<cision-list href="service/hosting/list/json">
		<cision-list-item>A</cision-list-item>
		<cision-list-item>B</cision-list-item>
		<!-- ... -->

		<cision-button onClick="follow(next)">
		<cision-button onClick="follow(prev)">
	</cision-list>

```

based on those returned results, if say the `prev` page did not exist in the JSON (aka, we are on the first page) the application could manage the `disabled` attribute on the appropriate `cision-button`.

```html
	<cision-button onClick="follow(prev)" disabled>
```

this ability to compose simpler elements into specific functional units that add new capabilities is key.

in this case the above the logic that provides the `disabled` management from the JSON api could be encapsulated in a `cision-paged-list`.  that to say. any api that is capable of understanding the `cision-list` api could then be evolved into a list which is capable of paging (as the backend implementation is light up).

and while this interaction leads to a "everything is a resource api", that thinking should not implicitly imply that the api is local, remote, or batch processed.   these consideration are for the application to describe independently from the component implementations and features



further examples of using element as data storage in the DOM can be again found in the `select` / `option` usage.


```html
	<input list="someDataList" />
	<!-- ... -->
	<datalist id="someDataList">
		<option value="One" />
		<option value="Two" />
		<option value="Three" />
		<!-- ... -->
	</datalist>
```




